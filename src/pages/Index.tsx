import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const HERO_IMG = 'https://cdn.poehali.dev/projects/e286d4e4-31d5-488b-95e2-ef4a099f9aba/files/115b72cd-fb1d-498c-aa2e-238bf8e3b2a9.jpg';

const NAV = [
  { id: 'home', label: 'Главная', icon: 'Home' },
  { id: 'shop', label: 'Магазин', icon: 'ShoppingBag' },
  { id: 'cosmetics', label: 'Косметика', icon: 'Sparkles' },
  { id: 'titles', label: 'Титулы', icon: 'Crown' },
  { id: 'profile', label: 'Профиль', icon: 'User' },
];

type Item = {
  name: string;
  type: 'Косметика' | 'Титул';
  rarity: 'Обычный' | 'Редкий' | 'Эпический' | 'Легендарный';
  price: number;
  oldPrice?: number;
  icon: string;
};

const RARITY: Record<Item['rarity'], { color: string; glow: string }> = {
  'Обычный': { color: 'text-slate-300 border-slate-500/40', glow: '' },
  'Редкий': { color: 'text-cyan-300 border-cyan-400/50', glow: 'group-hover:glow-cyan' },
  'Эпический': { color: 'text-fuchsia-300 border-fuchsia-400/50', glow: 'group-hover:glow-magenta' },
  'Легендарный': { color: 'text-amber-300 border-amber-400/50', glow: 'group-hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.6)]' },
};

const ITEMS: Item[] = [
  { name: 'Неоновый клинок', type: 'Косметика', rarity: 'Легендарный', price: 1200, oldPrice: 1800, icon: 'Swords' },
  { name: 'Король Арены', type: 'Титул', rarity: 'Эпический', price: 850, icon: 'Crown' },
  { name: 'Плазменный шлейф', type: 'Косметика', rarity: 'Эпический', price: 640, oldPrice: 900, icon: 'Flame' },
  { name: 'Тень Воина', type: 'Косметика', rarity: 'Редкий', price: 320, icon: 'Ghost' },
  { name: 'Легенда Brawl', type: 'Титул', rarity: 'Легендарный', price: 1500, icon: 'Star' },
  { name: 'Кибер-маска', type: 'Косметика', rarity: 'Редкий', price: 410, oldPrice: 550, icon: 'Bot' },
  { name: 'Ледяной страж', type: 'Косметика', rarity: 'Обычный', price: 150, icon: 'Snowflake' },
  { name: 'Покоритель', type: 'Титул', rarity: 'Редкий', price: 280, icon: 'Trophy' },
];

const Clover = ({ className = '' }: { className?: string }) => (
  <span className={`inline-flex items-center text-cyan-300 ${className}`}>💠</span>
);

type CartLine = { item: Item; qty: number };

function Index() {
  const [active, setActive] = useState('home');
  const [filter, setFilter] = useState<'all' | 'Косметика' | 'Титул'>('all');
  const [balance, setBalance] = useState(2450);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const { toast } = useToast();

  const visible = ITEMS.filter((i) => filter === 'all' || i.type === filter);
  const cartCount = cart.reduce((s, l) => s + l.qty, 0);
  const cartTotal = cart.reduce((s, l) => s + l.item.price * l.qty, 0);

  const addToCart = (item: Item) => {
    setCart((prev) => {
      const found = prev.find((l) => l.item.name === item.name);
      if (found) return prev.map((l) => (l.item.name === item.name ? { ...l, qty: l.qty + 1 } : l));
      return [...prev, { item, qty: 1 }];
    });
    setCartOpen(true);
  };

  const changeQty = (name: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((l) => (l.item.name === name ? { ...l, qty: l.qty + delta } : l))
        .filter((l) => l.qty > 0)
    );
  };

  const checkout = () => {
    if (cartTotal > balance) {
      toast({ title: 'Недостаточно клеверов 💠', description: `Не хватает ${cartTotal - balance} 💠. Пополни баланс.`, variant: 'destructive' });
      return;
    }
    setBalance((b) => b - cartTotal);
    toast({ title: 'Покупка успешна! 🎉', description: `Куплено товаров: ${cartCount}. Списано ${cartTotal} 💠.` });
    setCart([]);
    setCartOpen(false);
  };

  return (
    <div className="min-h-screen grid-bg text-foreground font-body overflow-x-hidden">
      {/* Ambient glows */}
      <div className="pointer-events-none fixed -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="pointer-events-none fixed top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-fuchsia-500/20 blur-[120px]" />

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-white/5">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-fuchsia-500 flex items-center justify-center font-display font-bold text-background text-lg glow-cyan">B</div>
            <span className="font-display text-xl font-bold tracking-wide">
              BRAWL <span className="text-gradient">SHON</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => setActive(n.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                  active === n.id ? 'text-cyan-300 bg-cyan-400/10' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={n.icon} size={16} />
                {n.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary border border-cyan-400/20 font-display font-semibold">
              <Clover /> <span className="text-cyan-300">{balance.toLocaleString('ru-RU')}</span>
            </div>
            <button
              onClick={() => setCartOpen(true)}
              className="relative w-9 h-9 rounded-full bg-secondary border border-white/10 flex items-center justify-center hover:border-cyan-400/40 transition-colors"
            >
              <Icon name="ShoppingCart" size={18} className="text-cyan-300" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 rounded-full bg-fuchsia-500 text-white text-[10px] font-bold flex items-center justify-center animate-scale-in">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 flex items-center justify-center">
              <Icon name="User" size={18} className="text-background" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative container py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-400/30 text-fuchsia-300 text-xs font-semibold mb-5">
              <Icon name="Zap" size={14} /> Сезон 1 · Открыт магазин
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] mb-5">
              ПРОКАЧАЙ<br />СВОЙ <span className="shimmer-text animate-shimmer">СТИЛЬ</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-md mb-8">
              Покупай эксклюзивную косметику и легендарные титулы за клеверы <Clover />. Стань легендой арены Brawl Shon.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="bg-gradient-to-r from-cyan-400 to-cyan-500 text-background font-display font-semibold hover:opacity-90 glow-cyan">
                <Icon name="ShoppingBag" size={18} /> В магазин
              </Button>
              <Button size="lg" variant="outline" className="border-fuchsia-400/40 text-fuchsia-200 hover:bg-fuchsia-500/10 font-display font-semibold">
                <Icon name="Gift" size={18} /> Получить бонус
              </Button>
            </div>
          </div>

          <div className="relative animate-float">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/30 to-fuchsia-500/30 blur-3xl rounded-full" />
            <img src={HERO_IMG} alt="Brawl Shon Arena" className="relative rounded-2xl border border-white/10 shadow-2xl" />
          </div>
        </div>
      </section>

      {/* Personal offer */}
      <section className="container mb-14">
        <div className="relative overflow-hidden rounded-2xl border border-fuchsia-400/30 bg-gradient-to-r from-fuchsia-500/15 via-secondary to-cyan-500/15 p-6 md:p-8 animate-fade-in">
          <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/20 blur-3xl rounded-full" />
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-fuchsia-300 text-xs font-bold uppercase tracking-wider mb-2">
                <Icon name="BadgePercent" size={14} /> Персональная скидка
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-1">Только для тебя — <span className="text-gradient">−40%</span> на легендарки</h3>
              <p className="text-muted-foreground text-sm">Спецпредложение активно ещё <span className="text-cyan-300 font-semibold">23:59:04</span></p>
            </div>
            <Button size="lg" className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-display font-semibold glow-magenta shrink-0">
              Забрать оффер <Icon name="ArrowRight" size={18} />
            </Button>
          </div>
        </div>
      </section>

      {/* Shop */}
      <section className="container pb-20">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-7">
          <h2 className="font-display text-3xl md:text-4xl font-bold">МАГАЗИН</h2>
          <div className="flex gap-2 p-1 rounded-xl bg-secondary border border-white/5">
            {(['all', 'Косметика', 'Титул'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  filter === f ? 'bg-cyan-400 text-background' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {f === 'all' ? 'Всё' : f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {visible.map((item, idx) => {
            const r = RARITY[item.rarity];
            return (
              <div
                key={item.name}
                className={`group relative rounded-2xl border bg-card/60 backdrop-blur p-5 transition-all duration-300 hover:-translate-y-1 ${r.color} ${r.glow} animate-fade-in`}
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${r.color}`}>
                    {item.rarity}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{item.type}</span>
                </div>

                <div className="flex items-center justify-center h-28 mb-4">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-secondary to-background flex items-center justify-center border ${r.color} transition-transform group-hover:scale-110`}>
                    <Icon name={item.icon} size={36} className="opacity-90" />
                  </div>
                </div>

                <h3 className="font-display font-semibold text-base mb-3 leading-tight">{item.name}</h3>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    {item.oldPrice && (
                      <span className="text-xs text-muted-foreground line-through">{item.oldPrice} 💠</span>
                    )}
                    <span className="font-display font-bold text-cyan-300 flex items-center gap-1">
                      {item.price} <Clover />
                    </span>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => addToCart(item)}
                    className="bg-cyan-400/10 hover:bg-cyan-400 hover:text-background text-cyan-300 border border-cyan-400/30 font-semibold transition-all"
                  >
                    <Icon name="Plus" size={16} />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Cart drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <aside className="relative w-full max-w-md h-full bg-card border-l border-white/10 flex flex-col animate-slide-in-right">
            <div className="flex items-center justify-between p-5 border-b border-white/5">
              <h3 className="font-display text-xl font-bold flex items-center gap-2">
                <Icon name="ShoppingCart" size={20} className="text-cyan-300" /> Корзина
              </h3>
              <button onClick={() => setCartOpen(false)} className="w-8 h-8 rounded-lg hover:bg-secondary flex items-center justify-center">
                <Icon name="X" size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {cart.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground gap-3">
                  <Icon name="PackageOpen" size={48} className="opacity-40" />
                  <p>Корзина пуста. Добавь косметику или титулы!</p>
                </div>
              )}
              {cart.map((line) => {
                const r = RARITY[line.item.rarity];
                return (
                  <div key={line.item.name} className="flex items-center gap-3 rounded-xl border border-white/5 bg-secondary/40 p-3">
                    <div className={`w-12 h-12 shrink-0 rounded-lg bg-gradient-to-br from-secondary to-background flex items-center justify-center border ${r.color}`}>
                      <Icon name={line.item.icon} size={22} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-semibold text-sm truncate">{line.item.name}</p>
                      <p className="text-cyan-300 text-sm font-semibold flex items-center gap-1">{line.item.price} <Clover /></p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => changeQty(line.item.name, -1)} className="w-7 h-7 rounded-md bg-secondary border border-white/10 flex items-center justify-center hover:border-cyan-400/40">
                        <Icon name="Minus" size={14} />
                      </button>
                      <span className="w-5 text-center font-semibold">{line.qty}</span>
                      <button onClick={() => changeQty(line.item.name, 1)} className="w-7 h-7 rounded-md bg-secondary border border-white/10 flex items-center justify-center hover:border-cyan-400/40">
                        <Icon name="Plus" size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-5 border-t border-white/5 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Твой баланс</span>
                <span className="font-display font-semibold text-cyan-300 flex items-center gap-1">{balance.toLocaleString('ru-RU')} <Clover /></span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-display font-semibold">Итого</span>
                <span className="font-display text-xl font-bold text-cyan-300 flex items-center gap-1">{cartTotal.toLocaleString('ru-RU')} <Clover /></span>
              </div>
              <Button
                size="lg"
                disabled={cart.length === 0}
                onClick={checkout}
                className="w-full bg-gradient-to-r from-cyan-400 to-cyan-500 text-background font-display font-semibold hover:opacity-90 glow-cyan disabled:opacity-40"
              >
                <Icon name="Check" size={18} /> Купить за клеверы
              </Button>
            </div>
          </aside>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-cyan-400 to-fuchsia-500 flex items-center justify-center font-display font-bold text-background text-sm">B</div>
            <span className="font-display font-semibold">BRAWL SHON</span>
          </div>
          <p>© 2026 Brawl Shon. Валюта проекта — клеверы 💠</p>
          <div className="flex gap-3">
            <Icon name="MessageCircle" size={18} className="hover:text-cyan-300 cursor-pointer transition-colors" />
            <Icon name="Send" size={18} className="hover:text-cyan-300 cursor-pointer transition-colors" />
            <Icon name="Youtube" size={18} className="hover:text-cyan-300 cursor-pointer transition-colors" />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Index;