import { FadeRise } from '../motion/FadeRise';

interface ManifestoProps {
  caption?: string;
  body: string[];
  scriptAccent?: { text: string; insertAfter: string };
}

const INLINE_SCRIPT_STYLE: React.CSSProperties = {
  fontFamily: 'Italianno, cursive',
  fontWeight: 400,
  fontSize: '1.4em',
  lineHeight: 0.9,
  verticalAlign: '-0.05em',
};

export function Manifesto({
  caption = 'Manifesto',
  body,
  scriptAccent,
}: ManifestoProps) {
  return (
    <section className="px-6 lg:px-10 py-32 bg-paper">
      <div className="max-w-3xl mx-auto">
        <p className="caption text-stone text-center mb-12">{caption}</p>
        <FadeRise>
          <div className="font-display text-3xl md:text-4xl leading-tight tracking-tight">
            {body.map((para, idx) => {
              if (scriptAccent && para.includes(scriptAccent.insertAfter)) {
                const pieces = para.split(scriptAccent.insertAfter);
                return (
                  <p key={idx} className="mb-8">
                    {pieces.map((piece, i) => (
                      <span key={i}>
                        {piece}
                        {i < pieces.length - 1 && (
                          <>
                            {scriptAccent.insertAfter}{' '}
                            <span className="text-rust" style={INLINE_SCRIPT_STYLE}>
                              {scriptAccent.text}
                            </span>{' '}
                          </>
                        )}
                      </span>
                    ))}
                  </p>
                );
              }
              return (
                <p key={idx} className="mb-8">
                  {para}
                </p>
              );
            })}
          </div>
        </FadeRise>
      </div>
    </section>
  );
}
