/**
 * Affichage uniforme d'un message d'erreur.
 * Utiliser avec getErrorMessage(error) depuis services/api.js
 *
 * Usage :
 * {error && <ErrorAlert message={error} />}
 */
function ErrorAlert({ message }) {
  if (!message) return null;

  return (
    <div className="error-alert" role="alert">
      {message}
    </div>
  );
}

export default ErrorAlert;
