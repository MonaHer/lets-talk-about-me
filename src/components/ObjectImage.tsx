type Props = { iiifBase: string; alt: string };

export function ObjectImage({ iiifBase, alt }: Props) {
  return (
    <figure className="object-image">
      <img src={`${iiifBase}/full/800,/0/default.jpg`} alt={alt} />
    </figure>
  );
}
