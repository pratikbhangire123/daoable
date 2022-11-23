export default function useLoader() {
  const myLoader = ({ src, width }) => {
    return `https://2eff.lukso.dev/ipfs/${src}?w=${width}`;
  };

  return [myLoader];
}
