import { useEffect, useState } from "react";
import { ImageBoard } from "./components/ImageBoard";
import { Image } from "./domain/entities/Image";

function App() {
  const [image, setImage] = useState<Image>()

  useEffect(() => {
    (async() => {
      const blob = await fetch("https://picsum.photos/700/700").then(r => r.blob());
      const image = new Image(blob);
      setImage(image);
    })()
  }, [])
  return image && <ImageBoard image={image} />;
}

export default App;
