
import { useEffect, useRef } from 'react';
import { CheckCircle } from 'lucide-react';

const advantages = [
  "Mais de 15 anos de experiência no mercado",
  "Equipe de profissionais altamente qualificados",
  "Atendimento personalizado e humanizado",
  "Tecnologia de ponta para processos eficientes",
  "Confidencialidade e segurança garantidas",
  "Consultoria estratégica para seu negócio"
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          const elements = entry.target.querySelectorAll('.animate-element');
          elements.forEach((el, i) => {
            setTimeout(() => {
              el.classList.add('animate-fadeIn');
            }, i * 200);
          });
        }
      },
      {
        threshold: 0.1
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="section-padding bg-gray-50" id="about">
      <div className="container mx-auto px-4" ref={sectionRef}>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="opacity-0 animate-element">
              <span className="inline-block py-1 px-3 rounded-full text-sm font-medium bg-blue-100 text-blue-600 mb-4">
                Sobre Nós
              </span>
              <h2 className="heading-lg mb-6">
                Dedicação e excelência em serviços contábeis
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Desde nossa fundação, nos dedicamos ao auxílio administrativo de empresas de diversos portes e segmentos. 
                Utilizamos técnicas contábeis e administrativas modernas para oferecer um serviço completo e de qualidade.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Nossa equipe técnica está em constante capacitação para oferecer soluções inovadoras na área contábil, 
                visando sempre atender às necessidades específicas de cada cliente.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {advantages.map((advantage, index) => (
                <div key={index} className="flex items-start opacity-0 animate-element">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="ml-3 text-gray-700">{advantage}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="opacity-0 animate-element order-first md:order-last">
            <div className="relative">
              <div className="absolute -left-4 -top-4 w-24 h-24 bg-blue-200 rounded-lg opacity-50"></div>
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-blue-300 rounded-lg opacity-30"></div>
              <div className="relative overflow-hidden rounded-xl shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80" 
                  alt="Equipe de contabilidade" 
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
