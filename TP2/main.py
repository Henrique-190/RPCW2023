import os

from bs4 import BeautifulSoup

file = open("arq.xml", "r")
contents = file.read()
soup = BeautifulSoup(contents, 'xml')


def desmembrar():
    arqs = soup.find_all('ARQELEM')

    x = 0

    l = soup.find_all("IDENTI")

    for arq in arqs:
        f = open("dataXML/arq" + str(x) + ".xml", "w", encoding='iso-8859-1')
        f.write("<?xml version=\"1.0\" encoding=\"iso-8859-1\"?>\n")
        f.write(arq.prettify())
        f.close()
        x += 1

    f = open("dataHTML/index.html", "w")
    i = 0
    f.write("""
<title>ARQ</title>
<meta charset="utf-8"/>
<h1>INDEX</h1>
<table>
    <tbody><tr>
    <td width="30%" valign="top">
    <h3></h3>
    <a name="indice">
    <!-- Lista com o índice -->
    </a><ul><a name="indice">
    </a>""")
    for cidade in l:
        f.write("""
            <li><a name=\"""" + cidade.getText() + """\">  
                </a><a href=\"""" + str(i) + """\">""" + cidade.getText() + """</a></li>
        """)
        i += 1

    f.write(
            """         </ul>           
                    </td>
                </tr>
            </tbody>
        </table>
        """)
    f.close()


def converteHTML(contents):
    bss = BeautifulSoup(contents, 'xml')
    soup = bss.find("ARQELEM")
    cidade = soup.find("IDENTI").getText()
    descricao = soup.find("DESCRI").getText()
    lugar = soup.find("LUGAR").getText()
    freguesia = soup.find("FREGUE").getText()
    concelho = soup.find("CONCEL").getText()
    desarq = soup.find("DESARQ").getText()
    autor = soup.find("AUTOR").getText()
    data = soup.find("DATA").getText()

    #opcionais
    restante = ""
    if soup.find("TIPO"):
        restante += "<p><b>Tipo: </b>" + soup.find("TIPO").get("ASSUNTO").capitalize() + "</p>\n"
    if soup.find("CODADM"):
        restante += "<p><b>Código Administrativo: </b>" + soup.find("CODADM").getText() + "</p>\n"
    if soup.find("LATITU"):
        restante += "<p><b>Latitude: </b>" + soup.find("LATITU").getText() + "</p>\n"
    if soup.find("LONGIT"):
        restante += "<p><b>Longitude: </b>" + soup.find("LONGIT").getText() + "</p>\n"
    if soup.find("ALTITU"):
        restante += "<p><b>Altitude: </b>" + soup.find("ALTITU").getText() + "</p>\n"
    bib = soup.findAll("BIBLIOGRAFIA")
    if bib is not None and len(bib) > 0:
        restante += "<p><b>Bibliografia: </b>\n<ul>\n"
        for b in bib:
            restante += "<li>" + b.getText() + "</li>\n"
        restante += "</ul></p>\n"
    if soup.find("ACESSO"):
        restante += "<p><b>Acesso: </b>" + soup.find("ACESSO").getText() + "</p>\n"
    if soup.find("INTERP"):
        restante += "<p><b>Interpretação: </b>" + soup.find("INTERP").getText() + "</p>\n"
    if soup.find("DEPOSI"):
        restante += "<p><b>Depósito: </b>" + soup.find("DEPOSI").getText() + "</p>\n"
    if soup.find("IMAGEM"):
        restante += "<p><b>Imagem: </b>" + soup.find("IMAGEM").get("NOME") + "</p>\n"
    if soup.find("TRAARQ"):
        restante += "<p><b>Trabalho Arqueológico: </b>" + soup.find("TRAARQ").getText() + "</p>\n"
    if soup.find("QUADRO"):
        restante += "<p><b>Quadro: </b>" + soup.find("QUADRO").getText() + "</p>\n"
    if soup.find("CRONO"):
        restante += "<p><b>Cronologia: </b>" + soup.find("CRONO").getText() + "</p>\n"
    if soup.find("INTERE"):
        restante += "<p><b>Interpretação: </b>" + soup.find("INTERE").getText() + "</p>\n"

    html = f"""
<title>{cidade}</title>
<meta charset="iso-8859-1"/>
<h1>{cidade}</h1>
<table>
    <tbody><tr>
        <a name="{cidade}, {descricao}"></a>
        <p><b>Localização: </b>{lugar}, {freguesia}, {concelho}</p>
        <p><b>Descrição: </b>{descricao}</p>
        <p><b>Descrição Arqueológica: </b> {desarq}</p>
        <p><b>Autor: </b> {autor}</p>
        <p><b>Data: </b> {data}</p>
        <p>{restante}</p>
                    
        <center>
            <hr width="80%">
        </center>
    </tr></tbody>
</table>
"""
    return html


desmembrar()

for file in os.listdir("dataXML"):
    f = open("dataXML/" + file, "r", encoding='iso-8859-1')
    contents = f.read()
    f.close()

    data = converteHTML(contents)
    f = open("dataHTML/" + file.replace("xml", "html"), "w", encoding='iso-8859-1')
    f.write(data)
    f.close()
