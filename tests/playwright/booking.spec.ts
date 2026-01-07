import { test, expect } from '@playwright/test';

test('Hotel booking flow', async ({ page, request }) => {
  await page.goto('http://localhost:4000/dashboard.html');

  await page.selectOption('#city', 'Toronto');
  await page.waitForTimeout(500); // wait hotels to populate
  await page.selectOption('#hotel', { label: 'Hotel A' });

  await page.fill('#guests', '2');
  await page.fill('#checkIn', '2026-01-05');
  await page.fill('#checkOut', '2026-01-07');

  await page.click('#goToGuestDetailsBtn');

  await page.fill('#guestName0', 'John Doe');
  await page.fill('#guestEmail0', 'john@example.com');
  await page.fill('#guestPhone0', '1234567890');

  await page.fill('#guestName1', 'Jane Doe');
  await page.fill('#guestEmail1', 'jane@example.com');
  await page.fill('#guestPhone1', '0987654321');

  await page.click('#confirmBookingBtn');

  // Optionally verify booking via API
  const response = await request.get('http://localhost:4000/api/bookings');
  const bookings = await response.json();
  expect(bookings.length).toBeGreaterThan(0);
});
