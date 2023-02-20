import json
import uuid


def ordPessoa(c):
    return c['nome']


f = open("henriqueta.json")
data = json.load(f)
pessoas = data['pessoas']
pessoas.sort(key=ordPessoa)


pagWeb = """
        <title>Henriqueta</title>
        <meta charset="utf-8"/>
        <h1>Henriqueta</h1>
        <table>
            <tbody><tr>
                <td width="30%" valign="top">
                    <h3>Índice</h3>
                    <a name="indice">
                    <!-- Lista com o índice -->
                    </a><ul><a name="indice">
"""

for p in pessoas:
    pagWeb += f"""
        </a><li><a name="indice">
            </a><a href="#{p['nome']+p['dataNascimento']}">{p['nome']}</a>
        </li>
    """

pagWeb += "</ul>"

for p in pessoas:
    pagWeb += f"""
                    <a name="{p['nome']+p['dataNascimento']}">
                    <h3>{p['nome']}</h3>
                    <p><b>Data e Local de Nascimento: </b> {p['dataNascimento']} em {p['localNascimento']}</p>
                    <p><b>Descrição: </b> {p['descrição']}</p>
                    <p><b>Pai: </b> {p['pai']}</p>
                    <p><b>Mãe: </b> {p['mãe']}</p>
    """

    if p['marido']:
        pagWeb += f"""
                    <p><b>Casou com: </b>{p['marido'][0]}
                    """
        for marido in p['marido'][1:]:
            pagWeb += f"""
                    ;
                    {marido}
                    """

        pagWeb += f"""
                    </p>
        """
    else:
        pagWeb += f"""
                        <p><b>Não se casou com ninguém</b></p>
                """
    if p['filhos']:
        pagWeb += f"""
                    <p><b>Filhos: </b>
                    <ul>
                        <li>{p['filhos'][0]}</li>
                    """
        for filho in p['filhos'][1:]:
            pagWeb += f"""
                        <li>{filho}</li>
                    """

        pagWeb += f"""
                    </ul></p>
        """
    else:
        pagWeb += f"""
                        <p><b>Não teve filhos</b></p>
                """

    pagWeb += f"""
                        <p><b>Morte</b> {p['dataMorte']} em {p['localMorte']}</p>
        """

    pagWeb += f"""
                    <center>
                        <hr width="80%">
                    </center>
                    </a><address><a name="{p['nome']+p['dataNascimento']}">[</a><a href="#indice">Voltar ao índice</a>]</address>
                    <br><br>"""

pagWeb += """      
                </td>
            </tr>
        </tbody>
    </table>
"""
f = open("henriqueta.html", "w")
f.write(pagWeb)
f.close()
print(pagWeb)
