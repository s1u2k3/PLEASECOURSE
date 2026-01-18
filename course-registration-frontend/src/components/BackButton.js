import { useNavigate } from "react-router-dom";

function BackButton({ label = "Back" }) {
  const navigate = useNavigate();

  return (
    <button
      className="btn btn-outline-secondary btn-sm mb-3"
      onClick={() => navigate(-1)}
    >
      ← {label}
    </button>
  );
}

export default BackButton;
