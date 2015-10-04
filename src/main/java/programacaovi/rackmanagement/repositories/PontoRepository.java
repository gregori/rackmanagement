/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package programacaovi.rackmanagement.repositories;

import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import programacaovi.rackmanagement.model.Ponto;

/**
 *
 * @author rodrigo.gregori
 */
@RepositoryRestResource(collectionResourceRel = "pontos", path = "pontos")
public interface PontoRepository extends CrudRepository<Ponto, Long> {
    public List<Ponto> findByNumero(@Param("numero") int numero);
    public List<Ponto> findByPainelNome(@Param("nome") String nome);
}
