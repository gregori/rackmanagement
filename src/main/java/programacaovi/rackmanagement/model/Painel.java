/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package programacaovi.rackmanagement.model;

import java.util.List;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

/**
 *
 * @author rodrigo.gregori
 */
@Entity
public class Painel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    
    @NotNull
    private String nome;
    
    @OneToMany(mappedBy = "painel", fetch = FetchType.EAGER)
    private List<Ponto> pontos;
    
    public Painel() { }

    public Painel(String nome) {
        this.nome = nome;
    }

    public Painel(long id) {
        this.id = id;
    }
    
    public Painel(long id, String nome) {
        this.id = id;
        this.nome = nome;
    }

    /**
     * @return the id
     */
    public long getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(long id) {
        this.id = id;
    }

    /**
     * @return the nome
     */
    public String getNome() {
        return nome;
    }

    /**
     * @param nome the nome to set
     */
    public void setNome(String nome) {
        this.nome = nome;
    }

    /**
     * @return the pontos
     */
    public List<Ponto> getPontos() {
        return pontos;
    }

    /**
     * @param pontos the pontos to set
     */
    public void setPontos(List<Ponto> pontos) {
        this.pontos = pontos;
    }
    
}
