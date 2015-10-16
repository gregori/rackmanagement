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
import programacaovi.rackmanagement.model.Rack;

/**
 *
 * @author rodrigo.gregori
 */
@RepositoryRestResource(collectionResourceRel = "racks", path = "racks")
public interface RackRepository extends CrudRepository<Rack, Long> {
    public List<Rack> findByNome(@Param("nome") String nome);
}
