import Card from "../../common/Card/Card";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import { SaveProfileProps } from "../../../types/Props/UserProfileProps";
import { useProfileForm } from "../../../hooks/user/ProfileForm/useProfileForm";

export default function ProfileForm({ profile, onSave }: SaveProfileProps) {
  const { busy, error, saved, form, handleChange, handleSubmit } =
    useProfileForm(profile, onSave);

  return (
    <Card className="border-none rounded-[16px] p-6">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {saved && !error && (
        <p className="text-green-600 mb-4">Cambios guardados.</p>
      )}

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block mb-1 text-sm">Nombre</label>
          <Input
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm">Apellido</label>
          <Input
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block mb-1 text-sm">Correo</label>
        <Input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSubmit} disabled={busy}>
          {busy ? "Guardando…" : "Guardar cambios"}
        </Button>
      </div>
    </Card>
  );
}
