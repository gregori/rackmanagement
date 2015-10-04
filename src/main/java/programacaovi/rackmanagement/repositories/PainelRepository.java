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
import programacaovi.rackmanagement.model.Painel;

/**
 *
 * @author rodrigo.gregori
 */
@RepositoryRestResource(collectionResourceRel = "paineis", path = "paineis")
public interface PainelRepository extends CrudRepository<Painel, Long> {
    public List<Painel> findByNome(@Param("nome") String nome);
}
