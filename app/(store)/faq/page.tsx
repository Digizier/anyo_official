export default function FAQPage() {
  const faqs = [
    {
      q: "What is 260 GSM fabric?",
      a: "GSM stands for Grams per Square Meter. Standard t-shirts are 140-180 GSM. AYVO's 260 GSM combed cotton fabric is significantly denser, offering a boxy structured drape, zero transparency, and long-lasting durability.",
    },
    {
      q: "How long does shipping take in Pakistan?",
      a: "Orders are processed within 24 hours. Standard delivery across Pakistan takes 3-5 working days via tracked courier services. Orders above Rs. 4,999 qualify for Free Delivery.",
    },
    {
      q: "What is your return & exchange policy?",
      a: "We offer a 7-day hassle-free exchange policy. The item must be unworn, unwashed, and in its original luxury box packaging with tags intact. Contact us on WhatsApp (+92 371 0108284) to initiate.",
    },
    {
      q: "How should I wash my 3D Gold Monogram Tee?",
      a: "We recommend washing inside out in cold water with similar colors. Avoid iron placement directly on the 3D raised gold monogram. Hang dry or tumble dry low.",
    },
  ];

  return (
    <div className="pt-32 pb-24 bg-luxury-black text-luxury-white min-h-screen">
      <div className="max-w-3xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-label text-luxury-gold uppercase tracking-[0.25em] font-semibold">
            Help & Information
          </span>
          <h1 className="text-4xl font-serif font-bold">Frequently Asked Questions</h1>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-luxury-charcoal border border-luxury-dark space-y-2">
              <h3 className="font-serif text-lg font-bold text-luxury-gold">{faq.q}</h3>
              <p className="text-xs text-luxury-gray leading-relaxed font-sans">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
