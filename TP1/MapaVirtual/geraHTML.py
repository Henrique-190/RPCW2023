import json


def getCidade(destinoID):
    for c in cidades:
        if c['id'] == destinoID:
            return c['nome']


def ordCidade(c):
    return c['nome']


def ordLigacao(l):
    return l['id']


f = open("mapa.json")
data = json.load(f)
cidades = data['cidades']
cidades.sort(key=ordCidade)

ligacoes = data['ligações']
ligacoes.sort(key=ordLigacao)

pagWeb = """
        <title>Mapa Virtual</title>
    
        <h1>Mapa Virtual</h1>
        <table>
            <tbody><tr>
                <td width="30%" valign="top">
                    <h3>Índice</h3>
                    <a name="indice">
                    <!-- Lista com o índice -->
                    </a><ul><a name="indice">
"""

for c in cidades:
    pagWeb += f"""
        </a><li><a name="indice">
            </a><a href="https://epl.di.uminho.pt/~jcr/AULAS/RPCW2023/aulas/aula1/geraHTML.py#{c['id']}">{c['nome']}</a>
        </li>
    """

for c in cidades:
    pagWeb += f"""
                    <a name="{c['id']}">
                    <h3>{c['nome']}</h3>
                    <p><b>população:</b> {c['população']}</p>
                    <p><b>descrição:</b> {c['descrição']}</p>
                    <p><b>distrito:</b> {c['distrito']}</p>
    """
    pagWeb += f"""
                    <details>
                        <summary>Distâncias a outras cidades</summary>
    """

    for l in ligacoes:
        if l['origem'] == c['id']:
            destinoID = l['destino']
        elif l['destino'] == c['id']:
            destinoID = l['origem']
        else:
            continue
        cidade = getCidade(destinoID)
        pagWeb += f"""
                        <p><a href = "https://epl.di.uminho.pt/~jcr/AULAS/RPCW2023/aulas/aula1/geraHTML.py#{destinoID}" > <b>{cidade}</b> - {l['distância']}</a></p>
        """

    pagWeb += f"""
                    </details>
                    <center>
                        <hr width="80%">
                    </center>
                    </a><address><a name="{c['id']}">[</a><a href="https://epl.di.uminho.pt/~jcr/AULAS/RPCW2023/aulas
                    /aula1/geraHTML.py#indice">Voltar ao índice</a>]</address>
                    <br><br>"""

pagWeb += """      
                </td>
            </tr>
        </tbody>
    </table>
"""
f = open("mapavirtual.html", "w")
f.write(pagWeb)
f.close()
print(pagWeb)
