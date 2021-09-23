area = null;


function limparlista() {
    var p = document.getElementById('res');
    var filhos = p.childNodes;
    for( i = filhos.length - 1; i >= 0; i-- ) {
        if( filhos[i].tagName == 'LI' ) {
            p.removeChild( filhos[i] );
        }
    }
}

function ordenar(json) {
    /* Ordena o json(salario) crescente */
    var funcionarios = json.funcionarios.sort(function (a, b) {
        return a.salario - b.salario;
    });

    return funcionarios;
}

function ordena_root(funcionarios) {
    var fun = funcionarios.sort(function (a, b) {
        return a.salario - b.salario;
    });

    return fun;
}

function global_avg(funcionarios) {
    /* média salarial */
    var cont = 0;
    var soma = 0;
    funcionarios.forEach(function (elem) {
        soma += elem.salario;
        cont += 1;
    });

    return (soma/cont).toFixed(2);

}

function set_areas(json) {
    /* Organiza as areas pra pegar dps */
    var areas = new Map();
    json.areas.forEach(function(elem) {
        areas.set(elem.codigo, elem.nome);
    })
    return areas;
}

function global_max(funcionarios) {
    /* Pega as primeiras ocorrências do maior salário */
    atual = null;
    maximo = [];
    for (let i = funcionarios.length-1; i >= 0; i--) {
        if (i == funcionarios.length-1) {
            atual = funcionarios[i];
            maximo.push(funcionarios[i]);
        } else {
            if (funcionarios[i].salario == atual.salario) {
                maximo.push(funcionarios[i]);
            } else{
                break;
            }
        }
    }
    return maximo;
}

function global_min(funcionarios) {
    /* Pega as primeiras ocorrências do menor salário */
    atual = null;
    minimo = [];
    for (let i = 0; i <= funcionarios.length; i++) {
        if (i == 0) {
            atual = funcionarios[i];
            minimo.push(funcionarios[i]);
        } else {
            if (funcionarios[i].salario == atual.salario) {
                minimo.push(funcionarios[i]);
            } else{
                break;
            }
        }
    }
    return minimo;
}

function agrupar_by_area(funcionarios) {
    /* agrupa os funcionarios de acordo com as suas áreas */
    areas = new Map();
    funcionarios.forEach(function (elem) {
        if (areas.has(elem.area) == false) {
            areas.set(elem.area, [elem]);
        } else {
            areas.get(elem.area).push(elem);
        }
    });
    return areas;
}

function agrupar_by_sobrenome(funcionarios) {
    /* agrupa os funcionarios de acordo com as suas áreas */
    areas = new Map();
    funcionarios.forEach(function (elem) {
        if (areas.has(elem.sobrenome) == false) {
            areas.set(elem.sobrenome, [elem]);
        } else {
            areas.get(elem.sobrenome).push(elem);
        }
    });
    return areas;
}

function createItem(label) {
    var res = document.getElementById('res');
    var li = document.createElement('li');
    li.innerHTML = label;
    res.appendChild(li);
}

function show01(label, fun) {
    /* Apresenta o resultado final */
    nome = fun.nome+' '+fun.sobrenome;
    salario = (fun.salario).toFixed(2);
    /*console.log(label+'|'+nome+'|'+salario);*/
    createItem(label+'|'+nome+'|'+salario);
}

function questao1(funcionarios) {
    var maximo = global_max(funcionarios);
    for (fun in maximo) {
        fun = maximo[fun];
        show01('global_max', fun);
    }

    var minimo = global_min(funcionarios);
    for (fun in minimo) {
        fun = minimo[fun];
        show01('global_min', fun);
    }

    var media = global_avg(funcionarios);
    /*console.log('global_avg|'+media);*/
    createItem('global_avg|'+media);
}


function show02(label, fun) {
    /* Apresenta o resultado final */
    nome = fun.nome+' '+fun.sobrenome;
    salario = (fun.salario).toFixed(2);
    /*console.log(label+'|'+nome+'|'+salario);*/
    createItem(label+'|'+nome+'|'+salario);
}

function questao2(by_area) {
    /* Apresenta o resultado final */
    by_area.forEach(function (value, key) {
        var funcionarios = ordena_root(value);

        var maximo = global_max(funcionarios);
        for (fun in maximo) {
            fun = maximo[fun];
            area_nome = area.get(fun.area);
            show02('area_max|'+area_nome, fun);
        }

        var minimo = global_min(funcionarios);
        for (fun in minimo) {
            fun = minimo[fun];
            area_nome = area.get(fun.area);
            show02('area_min|'+area_nome, fun);
        }

        var media = global_avg(funcionarios);
        area_nome = area.get(key);
        /*console.log('area_avg|'+area_nome+'|'+media);*/
        createItem('area_avg|'+area_nome+'|'+media);

    });
}

function questao3(by_area){
    array = [];

    /*Cria os dicts e joga no array*/
    by_area.forEach(function (value, key) {
        array.push({key:value.length, value:key});
    });

    var ord = array.sort(function (a, b) {
        return a.key-b.key;
    });

    /*most_employees*/
    atual = null;
    maximo = [];
    for (let i = ord.length-1; i >= 0; i--) {
        if (i == ord.length-1) {
            atual = ord[i];
            maximo.push(ord[i]);
        } else {
            if (ord[i].key == atual.key) {
                maximo.push(ord[i]);
            } else{
                break;
            }
        }
    }
    for (most in maximo) {
        most = maximo[most];
        area_nome = area.get(most.value);
        /*console.log('most_employees|'+area_nome+'|'+most.key);*/
        createItem('most_employees|'+area_nome+'|'+most.key);
    }

    /*least_employees*/
    atual = null;
    minimo = [];
    for (let i = 0; i <= ord.length; i++) {
        if (i == 0) {
            atual = ord[i];
            minimo.push(ord[i]);
        } else {
            if (ord[i].key == atual.key) {
                minimo.push(ord[i]);
            } else{
                break;
            }
        }
    }
    for (least in minimo) {
        least = minimo[least];
        area_nome = area.get(least.value);
        /*console.log('least_employees|'+area_nome+'|'+least.key);*/
        createItem('least_employees|'+area_nome+'|'+least.key);
    }
}

function show04(label, fun){
    /* Apresenta o resultado final */
    nome = fun.nome+' '+fun.sobrenome;
    salario = (fun.salario).toFixed(2);
    /*console.log(label+'|'+nome+'|'+salario);*/
    createItem(label+'|'+nome+'|'+salario);

}

function questao4(by_sobrenome) {
    by_sobrenome.forEach(function (value, key) {

        if (value.length <= 1) {
            return;
        }

        var funcionarios = ordena_root(value);

        var maximo = global_max(funcionarios);
        for (fun in maximo) {
            fun = maximo[fun];
            show04('last_name_max|'+fun.sobrenome, fun);
        }

    });
}

function set_label(label) {
    document.querySelector(".resultado").innerHTML=label;
}

var inicio =null;

function load(json) {
    var funcionarios = ordenar(json);
    area = set_areas(json);
    questao1(funcionarios);
    var by_area = agrupar_by_area(funcionarios);
    questao2(by_area);
    questao3(by_area);
    var by_sobrenome = agrupar_by_sobrenome(funcionarios);
    questao4(by_sobrenome);

    segundos = ((Date.now() - inicio)/1000).toFixed(2);
    set_label('Resultado processado em '+segundos+' segundos');
}


function lerArquivo() {
    inicio = Date.now();

    var file = document.getElementById('escolher').files[0];
    if (file == null) {return;} else {set_label('Processando...');}
    var arquivo = $.getJSON(URL.createObjectURL(file), function(json) {
        load(json);
    });

    arquivo.fail(function(textStatus, error ) {
        set_label(error);
    });
}