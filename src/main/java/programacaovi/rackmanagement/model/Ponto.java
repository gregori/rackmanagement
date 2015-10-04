/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package programacaovi.rackmanagement.model;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;

/**
 *
 * @author rodrigo.gregori
 */
@Entity
public class Ponto {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    
    @NotNull
    private int numero;
    
    @ManyToOne
    private Painel painel;
    
    @OneToOne
    private Ponto conexao;
    
    
    
    public Ponto() { }
    
    public Ponto(long id) {
        this.id = id;
    }
    
    public Ponto(int numero) {
        this.numero = numero;
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
     * @return the numero
     */
    public int getNumero() {
        return numero;
    }

    /**
     * @param numero the numero to set
     */
    public void setNumero(int numero) {
        this.numero = numero;
    }

    /**
     * @return the painel
     */
    public Painel getPainel() {
        return painel;
    }

    /**
     * @param painel the painel to set
     */
    public void setPainel(Painel painel) {
        this.painel = painel;
    }

    /**
     * @return the conexao
     */
    public Ponto getConexao() {
        return conexao;
    }

    /**
     * @param conexao the conexao to set
     */
    public void setConexao(Ponto conexao) {
        this.conexao = conexao;
    }
}
