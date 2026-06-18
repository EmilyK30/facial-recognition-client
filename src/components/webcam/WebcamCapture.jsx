import { useRef, useState, useCallback, useEffect } from "react";

/**
 * Composant partage de capture d'image.
 * Utilise par les pages Register (Lissa) et Recognize (Maguette).
 *
 * Deux modes : webcam (recommande par le CDC) ou import de fichier JPEG.
 * Renvoie l'image capturee/importee au parent via onCapture(file)
 * sous forme d'un objet File, pret a etre envoye a l'API (multipart/form-data).
 *
 * Usage :
 * <WebcamCapture onCapture={(file) => setSelectedFile(file)} />
 */
function WebcamCapture({ onCapture }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [mode, setMode] = useState("webcam"); // "webcam" | "import"
  const [isStreaming, setIsStreaming] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);

  // Demarre la webcam quand on est en mode "webcam"
  useEffect(() => {
    if (mode !== "webcam") return;

    let cancelled = false;

    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 480, height: 360 },
        });
        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsStreaming(true);
        setError(null);
      } catch (err) {
        setError(
          "Impossible d'accéder à la webcam. Vérifiez les autorisations du navigateur."
        );
        setIsStreaming(false);
      }
    }

    startCamera();

    return () => {
      cancelled = true;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      setIsStreaming(false);
    };
  }, [mode]);

  // Nettoyage de l'URL de preview pour eviter les fuites memoire
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // Capture une image depuis le flux video (mode webcam)
  const handleCapture = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          setError("Échec de la capture. Réessayez.");
          return;
        }
        const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
        const url = URL.createObjectURL(blob);
        setPreviewUrl(url);
        onCapture(file);
      },
      "image/jpeg",
      0.92
    );
  }, [onCapture]);

  // Gere l'import d'un fichier depuis l'ordinateur (mode import)
  const handleFileChange = useCallback(
    (event) => {
      const file = event.target.files?.[0];
      if (!file) return;

      if (!file.type.includes("jpeg") && !file.type.includes("jpg")) {
        setError("Seules les images JPEG sont acceptées.");
        return;
      }

      setError(null);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onCapture(file);
    },
    [onCapture]
  );

  // Reinitialise pour reprendre une nouvelle photo
  const handleRetake = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    onCapture(null);
  }, [previewUrl, onCapture]);

  const switchMode = (newMode) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setError(null);
    onCapture(null);
    setMode(newMode);
  };

  return (
    <div className="webcam-capture">
      <div className="webcam-capture__tabs">
        <button
          type="button"
          className={mode === "webcam" ? "active" : ""}
          onClick={() => switchMode("webcam")}
        >
          Webcam
        </button>
        <button
          type="button"
          className={mode === "import" ? "active" : ""}
          onClick={() => switchMode("import")}
        >
          Importer un fichier
        </button>
      </div>

      {error && <p className="webcam-capture__error">{error}</p>}

      {!previewUrl && mode === "webcam" && (
        <div className="webcam-capture__live">
          <video ref={videoRef} autoPlay playsInline muted width={480} height={360} />
          <button type="button" onClick={handleCapture} disabled={!isStreaming}>
            Prendre la photo
          </button>
        </div>
      )}

      {!previewUrl && mode === "import" && (
        <div className="webcam-capture__import">
          <input type="file" accept="image/jpeg" onChange={handleFileChange} />
        </div>
      )}

      {previewUrl && (
        <div className="webcam-capture__preview">
          <img src={previewUrl} alt="Aperçu de la capture" width={480} height={360} />
          <button type="button" onClick={handleRetake}>
            Reprendre une photo
          </button>
        </div>
      )}

      {/* Canvas cache, utilise uniquement pour extraire l'image de la video */}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}

export default WebcamCapture;
