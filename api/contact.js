// ==========================================================================
// 1) CONTACT API RELAY (VERCEL SERVERLESS)
// Purpose: Recevoir le formulaire côté serveur et relayer vers GAS sans CORS navigateur.
// Key variables: process.env.GAS_URL_CONTACT, request body, GAS response.
// Logic flow: validate method -> validate env -> forward POST -> normalize response.
// ==========================================================================
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      ok: false,
      error: "Méthode non autorisée.",
    });
  }

  const gasUrl = String(process.env.GAS_URL_CONTACT || "").trim();
  if (!gasUrl) {
    return res.status(500).json({
      ok: false,
      error:
        "Service indisponible pour le moment. Merci d'envoyer un email à moriarty.webdesigner@gmail.com.",
    });
  }

  const payload = req.body && typeof req.body === "object" ? req.body : {};

  try {
    // ==========================================================================
    // 2) FORWARD TO GAS WEB APP
    // Purpose: Transférer les données du formulaire vers l'endpoint GAS cible.
    // Key variables: gasUrl, JSON payload, fetch response.
    // Logic flow: POST JSON -> parse JSON si possible -> propager succès/erreur.
    // ==========================================================================
    const gasResponse = await fetch(gasUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    const raw = await gasResponse.text();
    let parsed = null;
    try {
      parsed = raw ? JSON.parse(raw) : null;
    } catch (parseError) {
      parsed = null;
    }

    if (!gasResponse.ok || (parsed && parsed.ok === false)) {
      return res.status(502).json({
        ok: false,
        error:
          "Envoi impossible pour le moment. Merci d'envoyer un email à moriarty.webdesigner@gmail.com.",
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Votre message a bien été envoyé.",
    });
  } catch (error) {
    return res.status(502).json({
      ok: false,
      error:
        "Envoi impossible pour le moment. Merci d'envoyer un email à moriarty.webdesigner@gmail.com.",
    });
  }
}
