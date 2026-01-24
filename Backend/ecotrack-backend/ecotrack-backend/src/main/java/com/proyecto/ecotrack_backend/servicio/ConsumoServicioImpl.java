package com.proyecto.ecotrack_backend.servicio;

import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import com.proyecto.ecotrack_backend.dto.ConsumoDto;
import com.proyecto.ecotrack_backend.modelos.Consumo;
import com.proyecto.ecotrack_backend.modelos.Usuario;
import com.proyecto.ecotrack_backend.repositorio.ConsumoRepositorio;
import com.proyecto.ecotrack_backend.repositorio.UsuarioRepositorio;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ConsumoServicioImpl implements ConsumoServicio{

    private final ConsumoRepositorio consumoRepo;
    private final UsuarioRepositorio usuarioRepo;

    public ConsumoServicioImpl(ConsumoRepositorio consumoRepo, UsuarioRepositorio usuarioRepo) {
        this.consumoRepo = consumoRepo;
        this.usuarioRepo = usuarioRepo;
    }


    @Override
    public List<Consumo> obtenerConsumosPorUsuario(Integer id) {
        return consumoRepo.findByUsuarioId(id);
    }

    @Override
    public Consumo guardarConsumo(ConsumoDto consumoDTO) {
        // Forma moderna usando orElseThrow
        Usuario usuario = usuarioRepo.findById(consumoDTO.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + consumoDTO.getUsuarioId()));

        // Convertir DTO a Entidad
        Consumo consumo = new Consumo();
        consumo.setUsuario(usuario);
        consumo.setCategoria(consumoDTO.getCategoria());
        consumo.setCantidad(consumoDTO.getCantidad());
        consumo.setUnidad(consumoDTO.getUnidad());
        consumo.setFecha(consumoDTO.getFecha());
        consumo.setCo2(consumoDTO.getCo2());
        consumo.setNotas(consumoDTO.getNotas());

        return consumoRepo.save(consumo);
    }

    @Override
    public Consumo obtenerConsumoPorId(Integer id) {

        return consumoRepo.findById(id).get();
    }

    @Override
    public void eliminarConsumoPorId(Integer id) {

        consumoRepo.deleteById(id);
    }

    @Override
    public Consumo actualizarConsumo(ConsumoDto consumoDto) {
        Consumo consumo = consumoRepo.findById(consumoDto.getId()).get();

        consumo.setCategoria(consumoDto.getCategoria());
        consumo.setCantidad(consumoDto.getCantidad());
        consumo.setUnidad(consumoDto.getUnidad());
        consumo.setFecha(consumoDto.getFecha());
        consumo.setCo2(consumoDto.getCo2());
        consumo.setNotas(consumoDto.getNotas());

        return consumoRepo.save(consumo);
    }

    @Override
    public byte[] generarPdf(Integer id) {

        List<Consumo> consumos = obtenerConsumosPorUsuario(id);

        try(ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream()){

            String html = generarHtml(consumos);

            PdfRendererBuilder builder = new PdfRendererBuilder();

            builder.withHtmlContent(html, null);
            builder.toStream(byteArrayOutputStream);
            builder.run();

            return byteArrayOutputStream.toByteArray();

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public String generarHtml(List<Consumo> consumos) {
        StringBuilder sb = new StringBuilder();

        sb.append("""
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; }
                h1 { text-align: center; }
                table { width: 100%; border-collapse: collapse; }
                th, td { border: 1px solid #333; padding: 8px; }
                th { background-color: #f2f2f2; }
            </style>
        </head>
        <body>
            <h1>Listado de Consumos</h1>
            <table>
                <thead>
                    <tr>
                        <th>CATEGORIA</th>
                        <th>UNIDAD</th>
                        <th>CANTIDAD</th>
                        <th>FECHA</th>
                        <th>CO2</th>
                        <th>NOTAS</th>
                    </tr>
                </thead>
                <tbody>
    """);

        for (Consumo consumo : consumos) {
            sb.append("<tr>")
                    .append("<td>").append(consumo.getCategoria()).append("</td>")
                    .append("<td>").append(consumo.getUnidad()).append("</td>")
                    .append("<td>").append(consumo.getCantidad()).append("</td>")
                    .append("<td>").append(consumo.getFecha()).append("</td>")
                    .append("<td>").append(consumo.getCo2()).append("</td>")
                    .append("<td>").append(consumo.getNotas()).append("</td>")
                    .append("</tr>");
        }

        sb.append("""
                </tbody>
            </table>
        </body>
        </html>
    """);

        return sb.toString();
    }
}
