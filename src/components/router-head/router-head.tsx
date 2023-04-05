import { component$ } from '@builder.io/qwik';
import { useDocumentHead, useLocation } from '@builder.io/qwik-city';
import { generateId } from '~/services/mutations';

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();

  return (
    <>
      <title>{head.title}</title>

      <link rel="canonical" href={loc.url.href} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/svg+xml" href="/icons/lens.svg" />

      <meta name="title" content="Portfolio" />
      <meta name="description" content="Projects, GitHub, Skills" />
      <meta name="author" content="ChickenFace" />
      <meta name="robots" content="index" />
      <meta name="og:image" content="/pictures/halgorithmics.jpg" />
      <meta name="og:type" content="website" />

      {head.meta.map((m) => (
        <meta {...m} key={generateId()} />
      ))}

      {head.links.map((l) => (
        <link {...l} key={generateId()} />
      ))}

      {head.styles.map((s) => (
        <style 
          {...s.props} 
          key={generateId()} 
          dangerouslySetInnerHTML={s.style} 
        />
      ))}
    </>
  );
});
