var SHEET_NAME = "Respostas";
var SPREADSHEET_NAME = "Blog Automation PRO — Respostas dos Clientes";

function doPost(e) {
  try {
    var data = e.parameter;
    var ss = getOrCreateSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Data/Hora",
        "Nome da Empresa",
        "Segmento",
        "Site",
        "URL Loja",
        "URL Blog",
        "Fase da Empresa",
        "Público Principal",
        "Perfil de Renda",
        "Nível de Conhecimento",
        "Dores Principais",
        "Objeções Comuns",
        "Momentos de Compra",
        "Tom de Voz",
        "Proposta de Valor",
        "Diferencial Competitivo",
        "Principais Concorrentes",
        "Temas a Evitar",
        "CTA Principal",
        "Intenção Predominante",
        "Palavras-chave Foco",
        "Palavras-chave Evitar",
        "Sazonalidade",
        "Mix de Conteúdo",
        "Usuário WordPress",
        "Senha Aplicativo WP"
      ]);
      sheet.getRange(1, 1, 1, 26).setFontWeight("bold").setBackground("#1a1a2e").setFontColor("#ffffff");
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      new Date().toLocaleString("pt-BR"),
      data.nomeEmpresa || "",
      data.segmento || "",
      data.site || "",
      data.urlLoja || "",
      data.urlBlog || "",
      data.fase_empresa || "",
      data.publicoPrincipal || "",
      data.perfil_renda || "",
      data.nivel_conhecimento || "",
      data.dores_principais || "",
      data.objecoes_comuns || "",
      data.momentos_de_compra || "",
      data.tomVoz || "",
      data.proposta_de_valor || "",
      data.diferencial_competitivo || "",
      data.principais_concorrentes || "",
      data.temasEvitar || "",
      data.cta_principal || "",
      data.intencao_predominante || "",
      data.palavras_chave_foco || "",
      data.palavras_chave_evitar || "",
      data.sazonalidade || "",
      data.mix_conteudo || "",
      data.wp_usuario || "",
      data.wp_senha_app || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "ok" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSpreadsheet() {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty("SPREADSHEET_ID");

  if (id) {
    try { return SpreadsheetApp.openById(id); } catch (e) {}
  }

  var ss = SpreadsheetApp.create(SPREADSHEET_NAME);
  ss.getActiveSheet().setName(SHEET_NAME);
  props.setProperty("SPREADSHEET_ID", ss.getId());

  // Abre a planilha no Drive para fácil acesso
  Logger.log("Planilha criada: " + ss.getUrl());
  return ss;
}

// Rode esta função UMA VEZ para ver a URL da planilha criada
function verUrlPlanilha() {
  var ss = getOrCreateSpreadsheet();
  Logger.log("URL da planilha: " + ss.getUrl());
}
