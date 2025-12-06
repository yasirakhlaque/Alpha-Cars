import { useState } from 'react';
import { FaCalculator } from 'react-icons/fa';
import { formatMoney } from '../utils/helpers';
import { PRICING } from '../utils/constants';


function PriceCalculator({ basePrice, currency = "USD", locale = "en-US" }) {
  const [invites, setInvites] = useState(50);
  const [duration, setDuration] = useState(4);
  const [total, setTotal] = useState(null);
  const [error, setError] = useState(null);

  const MIN_INVITES = 0;
  const MAX_INVITES = 500;
  const MIN_DURATION = 1;
  const MAX_DURATION = 24;

  function calculateTotal(e) {
    if (e) e.preventDefault();
    setError(null);

    if (invites < 0 || duration <= 0) {
      setError("Please enter valid positive values for invites and duration.");
      setTotal(null);
      return;
    }

    const inviteCost = invites * PRICING.inviteRate;
    const durationCost = duration * PRICING.durationRate;
    const subtotal = basePrice + inviteCost + durationCost;

    const isEligibleForDiscount = invites > PRICING.discountThreshold;
    const discount = isEligibleForDiscount ? subtotal * PRICING.discountRate : 0;
    
    const finalTotal = Math.round((subtotal - discount) * 100) / 100;
    setTotal(finalTotal);
  }

  function resetForm() {
    setInvites(50);
    setDuration(4);
    setTotal(null);
    setError(null);
  }

  return (
    <form
      onSubmit={calculateTotal}
      className="bg-white/5 backdrop-blur-md rounded-2xl shadow-xl border border-white/10 p-6 space-y-6"
      aria-label="Price Calculator Form"
    >
      <div className="flex items-center space-x-2 border-b border-white/10 pb-3">
        <FaCalculator className="w-5 h-5 text-gray-300" />
        <h2 className="text-lg font-semibold text-white">Event Estimator</h2>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-300">
            Number of Invites
          </label>
          <span className="text-lg font-bold text-white">{invites}</span>
        </div>
        
        <input
          type="range"
          min={MIN_INVITES}
          max={MAX_INVITES}
          value={invites}
          onChange={(e) => setInvites(Number(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, rgb(255 255 255 / 0.3) 0%, rgb(255 255 255 / 0.3) ${(invites / MAX_INVITES) * 100}%, rgb(255 255 255 / 0.1) ${(invites / MAX_INVITES) * 100}%, rgb(255 255 255 / 0.1) 100%)`
          }}
        />
        
        <div className="flex justify-between text-xs text-gray-500">
          <span>{MIN_INVITES}</span>
          <span>{MAX_INVITES}</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-300">
            Duration of Event
          </label>
          <span className="text-lg font-bold text-white">{duration} Hours</span>
        </div>
        
        <input
          type="range"
          min={MIN_DURATION}
          max={MAX_DURATION}
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, rgb(255 255 255 / 0.3) 0%, rgb(255 255 255 / 0.3) ${((duration - MIN_DURATION) / (MAX_DURATION - MIN_DURATION)) * 100}%, rgb(255 255 255 / 0.1) ${((duration - MIN_DURATION) / (MAX_DURATION - MIN_DURATION)) * 100}%, rgb(255 255 255 / 0.1) 100%)`
          }}
        />
        
        <div className="flex justify-between text-xs text-gray-500">
          <span>{MIN_DURATION} Hour</span>
          <span>{MAX_DURATION} Hours</span>
        </div>
      </div>

      {error && (
        <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-2">{error}</div>
      )}

      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 space-y-3">
        <div className="text-sm text-gray-400 mb-2">Breakdown</div>

        <div className="text-sm text-gray-300 space-y-2">
          <div className="flex justify-between">
            <span>Base</span>
            <span>{formatMoney(basePrice, currency, locale)}</span>
          </div>

          <div className="flex justify-between">
            <span>Invites ({invites} × {formatMoney(PRICING.inviteRate, currency, locale)})</span>
            <span>{formatMoney(invites * PRICING.inviteRate, currency, locale)}</span>
          </div>

          <div className="flex justify-between">
            <span>Duration ({duration}h × {formatMoney(PRICING.durationRate, currency, locale)})</span>
            <span>{formatMoney(duration * PRICING.durationRate, currency, locale)}</span>
          </div>

          <div className="flex justify-between mt-2 pt-2 border-t border-white/10 font-medium">
            <span>Discount</span>
            <span className="text-green-400">
              {invites > PRICING.discountThreshold
                ? "-5%"
                : formatMoney(0, currency, locale)}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">
              {total === null ? "—" : formatMoney(total, currency, locale)}
            </span>
            {total !== null && (
              <span className="text-sm text-gray-400">per event</span>
            )}
          </div>
        </div>

        <div className="text-xs text-gray-400">
          {total === null ? (
            <>Adjust sliders and click <strong className="text-gray-300">Calculate</strong> to see estimate.</>
          ) : (
            <>Estimated cost based on your selections.</>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white rounded-lg font-medium shadow-lg transition-all hover:scale-[1.02] text-sm md:text-base"
        >
          Calculate
        </button>
        <button
          type="button"
          onClick={resetForm}
          className="px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 hover:text-white rounded-lg transition-all hover:bg-white/10 text-sm md:text-base"
        >
          Reset
        </button>
      </div>
    </form>
  );
}

export default PriceCalculator;