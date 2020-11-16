<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
    
    <xsl:template match="/">
        <xsl:result-document href="index.html">
            <html>
                <head>
                    <title>Index</title>
                </head>
            
                <body>
                    <h1>Lista de Arqueossiteos</h1>
                    <ul>
                        <xsl:apply-templates select="//ARQELEM">
                            <xsl:sort select="IDENTI"/>
                        </xsl:apply-templates>
                    </ul>            
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>
    
    
    <xsl:template match="ARQELEM">
        <li>
            <a href="arqfiles/{count(preceding-sibling::*)+1}.html">
            <xsl:value-of select="IDENTI"/></a>
        </li>
        <xsl:result-document href="arqfiles/{count(preceding-sibling::*)+1}.html">
            <html>
                <head>
                    <title><xsl:value-of select="IDENTI"/></title>
                    <meta charset="UTF-8"/>
                </head>
                
                <body>
                    <ul>
                        <xsl:if test="./preceding::ARQELEM[1]">
                            <li><a href="{generate-id(./preceding::ARQELEM[1])}.html">Anterior</a></li>
                        </xsl:if>
                        
                        <li><a><xsl:value-of select="count(//ARQELEM)-count(following::ARQELEM)"/>/<xsl:value-of select="count(//ARQELEM)"/></a></li>
                        <xsl:if test="./following::ARQELEM[1]">
                            <li><a href="{generate-id(./following::ARQELEM[1])}.html">Seguinte</a></li>
                        </xsl:if>
                        
                        <address>[<a href="../index.html">Voltar ao índice</a>]</address>
                    </ul>
                    
                    <div class="content">
                    <h1><xsl:value-of select="IDENTI"/></h1>
                    <table>
                        <tr>
                            <th>LUGAR:</th>
                            <td><xsl:value-of select="LUGAR"/></td>
                        </tr>
                        <tr>
                            <th>FREGUESIA:</th>
                            <td><xsl:value-of select="FREGUE"/></td>
                        </tr>
                        <tr>
                            <th>CONCELHO:</th>
                            <td><xsl:value-of select="CONCEL"/></td>
                            
                        </tr>
                        <xsl:if test="LATITU">
                        <tr>
                            <th>LATITUDE:</th>
                            <td><xsl:value-of select="LATITU"/></td>
                        </tr>
                        </xsl:if>
                        <xsl:if test="LONGIT">
                        <tr>
                            <th>LONGITUDE:</th>
                            <td><xsl:value-of select="LONGIT"/></td>
                        </tr>
                        </xsl:if>
                        <tr>
                            <th>ALTITUDE:</th>
                            <td><xsl:value-of select="ALTITU"/></td>   
                        </tr>
                        <xsl:if test="ACESSO">
                            <tr>
                                <th>ACESSO:</th>
                                <td><xsl:value-of select="ACESSO"/></td>
                            </tr>
                        </xsl:if>
                        <xsl:if test="QUADRO">
                            <tr>
                                <th>QUADRO:</th>
                                <td><xsl:value-of select="QUADRO"/></td>
                            </tr>
                        </xsl:if>
                        <tr>
                            <th>DESCRIÇÃO ARQUEOLÓGICA:</th>
                            <td><xsl:value-of select="DESARQ"/></td>
                        </tr>
                        <xsl:if test="BIBLIO">
                          <tr>
                             <th>BIBLIOGRAFIA:</th>
                             <td><xsl:value-of select="BIBLIO"/></td>
                          </tr>
                        </xsl:if>
                        <xsl:if test="LUGAR">
                            <tr>
                                <th>LUGAR:</th>
                                <td><xsl:value-of select="LUGAR"/></td>
                            </tr>
                        </xsl:if>
                        <tr>
                            <th>AUTOR:</th>
                            <td><xsl:value-of select="AUTOR"/></td>  
                        </tr>
                        <tr>
                            <th>DATA:</th>
                            <td><xsl:value-of select="DATA"/></td>     
                        </tr>
                    </table>
                    
                    </div>
                </body> 
            </html> 
        </xsl:result-document>
    </xsl:template>
    
    
    
</xsl:stylesheet>

