import { useRef, useState, useCallback, useEffect } from "react";

/**
 * Composant partage de capture d'image.
 * Utilise par Register (Lissa) et Recognize (Maguette).
 * S'adapte a la largeur du conteneur parent.
 */
function WebcamCapture({ onCapture }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [mode, setMode] = useState("webcam");
  const [isStreaming, setIsStreaming] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (mode !== "webcam") return;
    let cancelled = false;

    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720 },
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
        setIsStreaming(true);
        setError(null);
      } catch {
        setError("Impossible d'accéder à la webcam. Vérifiez les autorisations du navigateur.");
        setIsStreaming(false);
      }
    }

    startCamera();

    return () => {
      cancelled = true;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
      setIsStreaming(false);
    };
  }, [mode]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleCapture = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    canvas.toBlob((blob) => {
      if (!blob) { setError("Échec de la capture. Réessayez."); return; }
      const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
      onCapture(file);
    }, "image/jpeg", 0.92);
  }, [onCapture]);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.includes("jpeg") && !file.type.includes("jpg")) {
      setError("Seules les images JPEG sont acceptées.");
      return;
    }
    setError(null);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onCapture(file);
  }, [onCapture]);

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
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "12px" }}>

      {/* Onglets */}
      <div style={{ display: "flex", gap: "8px", width: "100%" }}>
        <button
          type="button"
          onClick={() => switchMode("webcam")}
          style={{
            flex: 1,
            padding: "10px",
            border: mode === "webcam" ? "none" : "1px solid #E5E7EB",
            borderRadius: "8px",
            background: mode === "webcam" ? "#6366F1" : "#FFFFFF",
            color: mode === "webcam" ? "#FFFFFF" : "#475569",
            fontWeight: 600,
            fontSize: "0.9rem",
            cursor: "pointer",
          }}
        >
          Webcam
        </button>
        <button
          type="button"
          onClick={() => switchMode("import")}
          style={{
            flex: 1,
            padding: "10px",
            border: mode === "import" ? "none" : "1px solid #E5E7EB",
            borderRadius: "8px",
            background: mode === "import" ? "#6366F1" : "#FFFFFF",
            color: mode === "import" ? "#FFFFFF" : "#475569",
            fontWeight: 600,
            fontSize: "0.9rem",
            cursor: "pointer",
          }}
        >
          Importer un fichier
        </button>
      </div>

      {/* Erreur */}
      {error && (
        <p style={{ color: "#DC2626", fontSize: "0.85rem", margin: 0 }}>{error}</p>
      )}

      {/* Mode webcam — flux video */}
      {!previewUrl && mode === "webcam" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{ width: "100%", borderRadius: "8px", border: "1px solid #E5E7EB", display: "block", background: "#000" }}
          />
          <button
            type="button"
            onClick={handleCapture}
            disabled={!isStreaming}
            style={{
              width: "100%",
              padding: "10px",
              border: "none",
              borderRadius: "8px",
              background: isStreaming ? "#6366F1" : "#E5E7EB",
              color: isStreaming ? "#FFFFFF" : "#94A3B8",
              fontWeight: 600,
              fontSize: "0.9rem",
              cursor: isStreaming ? "pointer" : "not-allowed",
            }}
          >
            Prendre la photo
          </button>
        </div>
      )}

      {/* Mode import */}
      {!previewUrl && mode === "import" && (
        <label
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            width: "100%",
            minHeight: "160px",
            border: "2px dashed #E5E7EB",
            borderRadius: "8px",
            background: "#F9FAFB",
            cursor: "pointer",
            padding: "24px",
            boxSizing: "border-box",
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="1.5">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          <span style={{ fontSize: "0.85rem", color: "#475569", fontWeight: 500 }}>
            Cliquez pour sélectionner une image JPEG
          </span>
          <input
            type="file"
            accept="image/jpeg"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </label>
      )}

      {/* Apercu */}
      {previewUrl && (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <img
            src={previewUrl}
            alt="Aperçu"
            style={{ width: "100%", borderRadius: "8px", border: "1px solid #E5E7EB", display: "block" }}
          />
          <button
            type="button"
            onClick={handleRetake}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              background: "#FFFFFF",
              color: "#475569",
              fontWeight: 600,
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
          >
            Reprendre une photo
          </button>
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}

export default WebcamCapture;
