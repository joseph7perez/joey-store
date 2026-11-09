import { TextField } from "./Field";

export function CustomerFields() {
  return (
    <fieldset className="space-y-4">
      <legend className="mb-5 font-display text-2xl font-semibold">Tus datos</legend>
      <TextField name="fullName" label="Nombre completo" autoComplete="name" />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          name="phone"
          label="Celular"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="300 123 4567"
          hint="Te escribimos a este número."
        />
        <TextField name="documentId" label="Cédula" inputMode="numeric" autoComplete="off" />
      </div>
    </fieldset>
  );
}
