import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getCurrentIsoWeekKey } from './schema_firestore';

describe('getCurrentIsoWeekKey', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should calculate the correct week for a standard mid-year date', () => {
    // 2025-06-15 is a Sunday (mid year) -> Week 24
    vi.setSystemTime(new Date('2025-06-15T12:00:00Z'));
    expect(getCurrentIsoWeekKey()).toBe('2025-W24');
  });

  it('should calculate the correct week for early January (Jan 1 on a Thursday)', () => {
    // 2026-01-01 is a Thursday, which is part of Week 1 of 2026
    vi.setSystemTime(new Date('2026-01-01T12:00:00Z'));
    expect(getCurrentIsoWeekKey()).toBe('2026-W01');
  });

  it('should calculate the correct week for early January (Jan 1 on a Friday)', () => {
    // 2021-01-01 is a Friday, which is part of Week 53 of 2020
    vi.setSystemTime(new Date('2021-01-01T12:00:00Z'));
    expect(getCurrentIsoWeekKey()).toBe('2020-W53');
  });

  it('should calculate the correct week for early January (Jan 2 on a Saturday)', () => {
    // 2021-01-02 is a Saturday, part of Week 53 of 2020
    vi.setSystemTime(new Date('2021-01-02T12:00:00Z'));
    expect(getCurrentIsoWeekKey()).toBe('2020-W53');
  });

  it('should calculate the correct week for early January (Jan 4 on a Monday)', () => {
    // 2021-01-04 is a Monday, which is Week 1 of 2021
    vi.setSystemTime(new Date('2021-01-04T12:00:00Z'));
    expect(getCurrentIsoWeekKey()).toBe('2021-W01');
  });

  it('should calculate the correct week for late December (Dec 31 on a Monday)', () => {
    // 2018-12-31 is a Monday, which is part of Week 1 of 2019
    vi.setSystemTime(new Date('2018-12-31T12:00:00Z'));
    expect(getCurrentIsoWeekKey()).toBe('2019-W01');
  });

  it('should calculate the correct week for late December (Dec 29 on a Monday)', () => {
    // 2014-12-29 is a Monday, which is Week 1 of 2015
    vi.setSystemTime(new Date('2014-12-29T12:00:00Z'));
    expect(getCurrentIsoWeekKey()).toBe('2015-W01');
  });

  it('should calculate the correct week for late December (Dec 31 on a Thursday)', () => {
    // 2020-12-31 is a Thursday, Week 53 of 2020
    vi.setSystemTime(new Date('2020-12-31T12:00:00Z'));
    expect(getCurrentIsoWeekKey()).toBe('2020-W53');
  });

  it('should handle leap year correctly', () => {
    // 2024 is a leap year. 2024-02-29 is Thursday.
    vi.setSystemTime(new Date('2024-02-29T12:00:00Z'));
    expect(getCurrentIsoWeekKey()).toBe('2024-W09');
  });
});
