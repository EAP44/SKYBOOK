import { X, Lock } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext.jsx";

export default function LoginModal({
  isOpen,
  onClose,
  onSuccess,
}) {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");
  const [loading, setLoading] =
    useState(false);
  const [error, setError] =
    useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      // const res = await api.login({
      //   email,
      //   password,
      // });

      await new Promise((r) =>
        setTimeout(r, 1500)
      );

      login(
        {
          name: "Ayoub",
          email,
        },
        "my-token"
      );

      onClose();

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError(
        "Email ou mot de passe incorrect."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
      <div className="bg-white rounded-xl p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Connexion
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full border p-3 rounded"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          <button
            disabled={loading}
            className="w-full bg-[#012169] text-white p-3 rounded flex justify-center gap-2"
          >
            {loading ? (
              "Connexion..."
            ) : (
              <>
                <Lock size={18} />
                Se connecter
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}