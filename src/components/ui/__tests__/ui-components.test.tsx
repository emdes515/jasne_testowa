// @vitest-environment happy-dom
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import { Button, Card, CardTitle, Badge, Modal, Input, ProgressBar } from '../index';

describe('UI Base Components', () => {
  afterEach(() => {
    cleanup();
  });

  describe('Button', () => {
    it('renders with children and handles click events', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Rozpocznij lekcję</Button>);

      const btn = screen.getByRole('button', { name: /rozpocznij lekcję/i });
      expect(btn).toBeDefined();
      fireEvent.click(btn);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('disables button when disabled or isLoading is set', () => {
      const handleClick = vi.fn();
      const { rerender } = render(<Button disabled onClick={handleClick}>Kliknij</Button>);

      const btn = screen.getByRole('button');
      expect(btn.hasAttribute('disabled')).toBe(true);
      fireEvent.click(btn);
      expect(handleClick).not.toHaveBeenCalled();

      rerender(<Button isLoading onClick={handleClick}>Ładowanie</Button>);
      expect(btn.hasAttribute('disabled')).toBe(true);
    });

    it('renders different variants and sizes', () => {
      const { rerender } = render(<Button variant="secondary" size="lg">Secondary</Button>);
      let btn = screen.getByRole('button');
      expect(btn.className).toContain('bg-surface-card-hover');

      rerender(<Button variant="outline">Outline</Button>);
      btn = screen.getByRole('button');
      expect(btn.className).toContain('border-white/15');

      rerender(<Button variant="destructive">Usuń</Button>);
      btn = screen.getByRole('button');
      expect(btn.className).toContain('bg-[#F43F5E]/15');
    });
  });

  describe('Card', () => {
    it('renders Card with subcomponents', () => {
      render(
        <Card variant="interactive">
          <CardTitle>Dział 1: Liczby Rzeczywiste</CardTitle>
          <p>Opis działu</p>
        </Card>
      );

      expect(screen.getByText('Dział 1: Liczby Rzeczywiste')).toBeDefined();
      expect(screen.getByText('Opis działu')).toBeDefined();
    });
  });

  describe('Badge', () => {
    it('renders variants correctly', () => {
      const { rerender } = render(<Badge variant="primary">Matura CKE</Badge>);
      expect(screen.getByText('Matura CKE')).toBeDefined();

      rerender(<Badge variant="streak">3 Dni</Badge>);
      expect(screen.getByText('3 Dni')).toBeDefined();

      rerender(<Badge variant="danger">Błąd</Badge>);
      expect(screen.getByText('Błąd')).toBeDefined();
    });
  });

  describe('Modal', () => {
    it('renders when isOpen is true and calls onClose on Escape', () => {
      const handleClose = vi.fn();
      render(
        <Modal isOpen={true} onClose={handleClose} title="Karta Wzorów CKE">
          <div>Treść modala</div>
        </Modal>
      );

      expect(screen.getByText('Karta Wzorów CKE')).toBeDefined();
      expect(screen.getByText('Treść modala')).toBeDefined();

      fireEvent.keyDown(window, { key: 'Escape' });
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('does not render content when isOpen is false', () => {
      render(
        <Modal isOpen={false} onClose={() => {}} title="Ukryty modal">
          <div>Treść ukryta</div>
        </Modal>
      );

      expect(screen.queryByText('Ukryty modal')).toBeNull();
    });
  });

  describe('Input', () => {
    it('renders input with value and handles change', () => {
      const handleChange = vi.fn();
      render(<Input placeholder="Wyszukaj zagadnienie..." onChange={handleChange} />);

      const input = screen.getByPlaceholderText('Wyszukaj zagadnienie...');
      fireEvent.change(input, { target: { value: 'funkcja liniowa' } });
      expect(handleChange).toHaveBeenCalled();
    });

    it('displays error state and helper text', () => {
      render(<Input hasError helperText="Niepoprawny format odpowiedzi" />);
      expect(screen.getByText('Niepoprawny format odpowiedzi')).toBeDefined();
    });
  });

  describe('ProgressBar', () => {
    it('renders progressbar with proper aria attributes', () => {
      render(<ProgressBar value={75} max={100} showLabel label="Szansa zdania" />);

      const progress = screen.getByRole('progressbar');
      expect(progress.getAttribute('aria-valuenow')).toBe('75');
      expect(screen.getByText('75%')).toBeDefined();
      expect(screen.getByText('Szansa zdania')).toBeDefined();
    });
  });
});
