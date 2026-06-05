import { ScriptReveal } from '../motion/ScriptReveal';
import { FadeRise } from '../motion/FadeRise';

interface ManifestoProps {
  caption?: string;
  body: string[];
  scriptAccent?: { text: string; insertAfter: string };
}

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
              if (
                scriptAccent &&
                para.includes(scriptAccent.insertAfter)
              ) {
                const pieces = para.split(scriptAccent.insertAfter);
                return (
                  <p key={idx} className="mb-8">
                    {pieces.map((piece, i) => (
                      <span key={i}>
                        {piece}
                        {i < pieces.length - 1 && (
                          <>
                            {scriptAccent.insertAfter}{' '}
                            <ScriptReveal>{scriptAccent.text}</ScriptReveal>{' '}
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
