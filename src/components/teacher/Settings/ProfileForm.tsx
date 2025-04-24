import React, { useState } from 'react';
import Card   from '../../common/Card/Card';
import Input  from '../../common/Input/Input';
import Button from '../../common/Button/Button';

export interface UserProfile {
  id          : number;
  first_name  : string;
  last_name   : string;
  email       : string;
}

interface Props {
  profile : UserProfile;
  onSave  : (data: Partial<Omit<UserProfile, 'id'>>) => Promise<void>;
}

export default function ProfileForm({ profile, onSave }: Props) {
  const [form,   setForm]   = useState(() => ({
    first_name : profile.first_name,
    last_name  : profile.last_name,
    email      : profile.email
  }));
  const [busy,   setBusy]   = useState(false);
  const [error,  setError]  = useState<string|null>(null);
  const [saved,  setSaved]  = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    setBusy(true); setError(null); setSaved(false);
    try {
      await onSave(form);
      setSaved(true);
    } catch (e:any) {
      setError(e.message ?? 'Error al guardar');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card className="border-none rounded-[16px] p-6">
      {error &&  <p className="text-red-500 mb-4">{error}</p>}
      {saved && !error && <p className="text-green-600 mb-4">Cambios guardados.</p>}

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block mb-1 text-sm">Nombre</label>
          <Input name="first_name" value={form.first_name} onChange={handleChange}/>
        </div>
        <div>
          <label className="block mb-1 text-sm">Apellido</label>
          <Input name="last_name" value={form.last_name} onChange={handleChange}/>
        </div>
      </div>

      <div className="mb-6">
        <label className="block mb-1 text-sm">Correo</label>
        <Input type="email" name="email" value={form.email} onChange={handleChange}/>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSubmit} disabled={busy}>
          {busy ? 'Guardando…' : 'Guardar cambios'}
        </Button>
      </div>
    </Card>
  );
}