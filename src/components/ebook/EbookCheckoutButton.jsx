'use client';

export default function EbookCheckoutButton({ label, variant = 'dark' }) {
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

  const styles =
    variant === 'light'
      ? 'bg-white text-neutral-900 hover:bg-neutral-100'
      : 'bg-neutral-900 text-white hover:bg-neutral-800';

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`rounded-full px-6 py-2 text-sm font-medium transition-colors ${styles}`}
    >
      {label}
    </button>
  );
}