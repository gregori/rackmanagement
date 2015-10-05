/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package programacaovi.rackmanagement;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author u35444
 */
@Controller
public class HomeController {
    @RequestMapping("/home")
    public String home() {
        return "index";
    }
}
