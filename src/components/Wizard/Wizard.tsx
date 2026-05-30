
export interface WizardPropsI {
  items: string[]
}

export function Wizard({ items }: WizardPropsI) {
  return (
    <div>
      {items.join(" > ")}
    </div>
  );
}