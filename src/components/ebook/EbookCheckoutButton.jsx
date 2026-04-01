'use client';

export default function EbookCheckoutButton({ label }) {
  const handleClick = async () => {
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
        return;
      }

      console.error('No checkout URL returned');
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="rounded-full px-6 py-2 bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
    >
      {label}
    </button>
  );
}