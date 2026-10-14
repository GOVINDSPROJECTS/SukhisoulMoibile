describe('Booking Financial Calculations', () => {
  const calculatePricing = (
    singleFee: number,
    plan: 'single' | 'journey' | 'soul'
  ) => {
    const planPrices = {
      single: singleFee,
      journey: Math.round(singleFee * 3.5),
      soul: Math.round(singleFee * 7.5),
    };

    const basePrice = planPrices[plan];
    const discount = Math.round(basePrice * 0.05);
    const gstTax = Math.round(basePrice * 0.18);
    const platformFee = 49;
    const finalAmount = Math.max(0, basePrice - discount + gstTax + platformFee);

    return {
      planPrices,
      basePrice,
      discount,
      gstTax,
      platformFee,
      finalAmount,
    };
  };

  it('calculates correct single session pricing for ₹500 default doctor fee', () => {
    const res = calculatePricing(500, 'single');
    expect(res.basePrice).toBe(500);
    expect(res.discount).toBe(25); // 5% of 500
    expect(res.gstTax).toBe(90); // 18% of 500
    expect(res.platformFee).toBe(49);
    // 500 - 25 + 90 + 49 = 614
    expect(res.finalAmount).toBe(614);
  });

  it('calculates journey 4-pack pricing with 3.5x multiplier', () => {
    const res = calculatePricing(500, 'journey');
    expect(res.basePrice).toBe(1750); // 500 * 3.5
    expect(res.discount).toBe(88); // Math.round(1750 * 0.05) = 87.5 -> 88
    expect(res.gstTax).toBe(315); // 1750 * 0.18 = 315
    expect(res.platformFee).toBe(49);
    // 1750 - 88 + 315 + 49 = 2026
    expect(res.finalAmount).toBe(2026);
  });

  it('calculates soul transformation package with 7.5x multiplier', () => {
    const res = calculatePricing(1000, 'soul');
    expect(res.basePrice).toBe(7500); // 1000 * 7.5
    expect(res.discount).toBe(375); // 5% of 7500
    expect(res.gstTax).toBe(1350); // 18% of 7500
    expect(res.platformFee).toBe(49);
    // 7500 - 375 + 1350 + 49 = 8524
    expect(res.finalAmount).toBe(8524);
  });

  it('prevents negative finalAmount for 0 rupee sessions or full waivers', () => {
    const res = calculatePricing(0, 'single');
    expect(res.basePrice).toBe(0);
    expect(res.discount).toBe(0);
    expect(res.gstTax).toBe(0);
    expect(res.finalAmount).toBeGreaterThanOrEqual(0);
  });
});
