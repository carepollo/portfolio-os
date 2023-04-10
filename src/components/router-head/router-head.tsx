import { component$ } from '@builder.io/qwik';
import { useDocumentHead, useLocation } from '@builder.io/qwik-city';
import { generateId } from '~/services/mutations';

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();

  const title = 'Portfolio OS';
  const author = 'ChickenFace';
  const description = `${author} is a Software Engineer experienced with Back-End technologies like NestJS, Fiber, Flask, MongoDB, MySQL`;
  const icon = '/icons/lens.svg';
  const picture = '/pictures/picture.png';

  return (
    <>
      <title>{head.title}</title>

      <link rel="canonical" href={loc.url.href} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/svg+xml" href={icon} />
      <link rel="apple-touch-icon" href={icon} />
      <meta name="msapplication-TileImage" content={icon} />

      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="author" content={author} />
      <meta name="robots" content="index" />

      <meta property="og:image" content={picture} />
      <meta property="og:image:alt" content="descriptive picture of the site" />

      <meta property="og:title" content={title} />
      <meta property="og:url" content={loc.url.href} />
      <meta property="og:site_name" content={author} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />
      <meta property="article:modified_time" content="2023-04-01T12:24:06+00:00" />
      <meta property="og:description" content={description} />

      <meta property="twitter:title" content={title} />
      <meta property="twitter:image" content={picture} />
      <meta property="twitter:label1" content="Est. reading time" />
      <meta property="twitter:data1" content="10 minutes" />
      <meta property="twitter:card" content="summary_large_image" />

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
