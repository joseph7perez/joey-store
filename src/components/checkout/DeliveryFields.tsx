import { getConfiguredCities } from "@/lib/shipping/shipping";
import { TextAreaField, TextField } from "./Field";

export function DeliveryFields() {
  const cities = getConfiguredCities();

  return (
    <fieldset className="space-y-4">
      <legend className="mb-5 font-display text-2xl font-semibold">Entrega</legend>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          name="city"
          label="Ciudad"
          autoComplete="address-level2"
          list={cities.length ? "joey-cities" : undefined}
        />
        <TextField name="neighborhood" label="Barrio" optional autoComplete="address-level3" />
      </div>
      {cities.length > 0 && (
        <datalist id="joey-cities">
          {cities.map((city) => (
            <option key={city} value={city} />
          ))}
        </datalist>
      )}
      <TextField
        name="address"
        label="Dirección"
        autoComplete="street-address"
        placeholder="Calle, número, apartamento o casa"
      />
      <TextAreaField
        name="notes"
        label="Indicaciones para la entrega"
        optional
        placeholder="Por ejemplo: dejar en portería, apto 1010, casa 1, horario para recibir"
      />
    </fieldset>
  );
}
