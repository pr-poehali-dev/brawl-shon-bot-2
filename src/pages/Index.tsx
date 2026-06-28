import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

const HERO_IMG = 'https://cdn.poehali.dev/projects/e286d4e4-31d5-488b-95e2-ef4a099f9aba/files/115b72cd-fb1d-498c-aa2e-238bf8e3b2a9.jpg';

const AVATARS = [
  { id: 'default', src: '', label: 'Без аватарки' },
  { id: 'warrior', src: 'https://cdn.poehali.dev/projects/e286d4e4-31d5-488b-95e2-ef4a099f9aba/files/ee20e869-f49a-4919-8f6e-2583ff0e80f2.jpg', label: 'Киберволин' },
  { id: 'girl', src: 'https://cdn.poehali.dev/projects/e286d4e4-31d5-488b-95e2-ef4a099f9aba/files/f4462ceb-32cd-4d77-a58c-0237321d6a8d.jpg', label: 'Нова' },
  { id: 'robot', src: 'https://cdn.poehali.dev/projects/e286d4e4-31d5-488b-95e2-ef4a099f9aba/files/04ac53ed-4992-4eab-af13-88d586f621d3.jpg', label: 'Протокол' },
  { id: 'ninja', src: 'https://cdn.poehali.dev/projects/e286d4e4-31d5-488b-95e2-ef4a099f9aba/files/a04720ec-ac00-4c01-bef9-8edfc8944664.jpg', label: 'Тень' },
];

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
  emoji?: string;
};

const RARITY: Record<Item['rarity'], { color: string; glow: string }> = {
  'Обычный': { color: 'text-slate-300 border-slate-500/40', glow: '' },
  'Редкий': { color: 'text-cyan-300 border-cyan-400/50', glow: '' },
  'Эпический': { color: 'text-fuchsia-300 border-fuchsia-400/50', glow: '' },
  'Легендарный': { color: 'text-amber-300 border-amber-400/50', glow: '' },
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
  { name: 'Пламя любви', type: 'Косметика', rarity: 'Обычный', price: 20, icon: 'Sparkles', emoji: '❤️‍🔥' },
  { name: 'Вихрь', type: 'Косметика', rarity: 'Обычный', price: 20, icon: 'Sparkles', emoji: '🌀' },
  { name: 'Денежный дождь', type: 'Косметика', rarity: 'Обычный', price: 20, icon: 'Sparkles', emoji: '💸' },
  { name: 'Оберег', type: 'Косметика', rarity: 'Обычный', price: 20, icon: 'Sparkles', emoji: '🪬' },
  { name: 'Искра', type: 'Косметика', rarity: 'Обычный', price: 20, icon: 'Sparkles', emoji: '💡' },
  { name: 'Фонарь', type: 'Косметика', rarity: 'Обычный', price: 20, icon: 'Sparkles', emoji: '🏮' },
  { name: 'Дракон', type: 'Косметика', rarity: 'Обычный', price: 20, icon: 'Sparkles', emoji: '🐲' },
  { name: 'Цветение', type: 'Косметика', rarity: 'Обычный', price: 20, icon: 'Sparkles', emoji: '🌸' },
  { name: 'Бум!Бум!Бум!', type: 'Титул', rarity: 'Эпический', price: 700, icon: 'Zap' },
  { name: 'Первая кровь', type: 'Титул', rarity: 'Эпический', price: 700, icon: 'Swords' },
  { name: 'Ха-Ха', type: 'Титул', rarity: 'Эпический', price: 700, icon: 'Laugh' },
  { name: 'Боль', type: 'Титул', rarity: 'Эпический', price: 700, icon: 'Skull' },
  { name: 'Панды', type: 'Титул', rarity: 'Легендарный', price: 3500, icon: 'Star', emoji: '🐼' },
  { name: 'Пельмень', type: 'Титул', rarity: 'Легендарный', price: 3500, icon: 'Star', emoji: '🥟' },
];

const Clover = ({ className = '' }: { className?: string }) => (
  <span className={`inline-flex items-center ${className}`}>💠</span>
);

type CartLine = { item: Item; qty: number };
type Profile = { nick: string; avatarId: string } | null;

function AvatarDisplay({ avatarId, size = 'md' }: { avatarId: string; size?: 'sm' | 'md' | 'lg' }) {
  const avatar = AVATARS.find((a) => a.id === avatarId);
  const sz = size === 'sm' ? 'w-9 h-9' : size === 'lg' ? 'w-24 h-24' : 'w-12 h-12';
  const iconSz = size === 'sm' ? 18 : size === 'lg' ? 40 : 22;
  if (!avatar || !avatar.src) {
    return (
      <div className={`${sz} rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 flex items-center justify-center shrink-0`}>
        <Icon name="User" size={iconSz} className="text-background" />
      </div>
    );
  }
  return <img src={avatar.src} alt={avatar.label} className={`${sz} rounded-full object-cover border-2 border-cyan-400/40 shrink-0`} />;
}

function load<T>(key: string, fallback: T): T {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}
function save<T>(key: string, value: T) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { console.warn(e); }
}

export default function Index() {
  const [active, setActive] = useState('home');
  const [filter, setFilter] = useState<'all' | 'Косметика' | 'Титул'>('all');
  const [balance, setBalance] = useState<number>(() => load('bs_balance', 2450));
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [owned, setOwned] = useState<Item[]>(() => load('bs_owned', []));
  const [profileTab, setProfileTab] = useState<'edit' | 'collection'>('edit');
  const [profile, setProfile] = useState<Profile>(() => load('bs_profile', null));
  const [editNick, setEditNick] = useState('');
  const [editAvatar, setEditAvatar] = useState('default');
  const [nickError, setNickError] = useState('');
  const { toast } = useToast();

  // Сохранение в localStorage при каждом изменении
  const setBalancePersist = (updater: number | ((b: number) => number)) => {
    setBalance((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      save('bs_balance', next);
      return next;
    });
  };
  const setOwnedPersist = (updater: Item[] | ((prev: Item[]) => Item[])) => {
    setOwned((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      save('bs_owned', next);
      return next;
    });
  };
  const setProfilePersist = (p: Profile) => {
    setProfile(p);
    save('bs_profile', p);
  };

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
      prev.map((l) => (l.item.name === name ? { ...l, qty: l.qty + delta } : l)).filter((l) => l.qty > 0)
    );
  };

  const checkout = () => {
    if (cartTotal > balance) {
      toast({ title: 'Недостаточно клеверов 💠', description: `Не хватает ${cartTotal - balance} 💠. Пополни баланс.`, variant: 'destructive' });
      return;
    }
    setBalancePersist((b) => b - cartTotal);
    setOwnedPersist((prev) => {
      const newItems = cart.map((l) => l.item).filter((i) => !prev.some((o) => o.name === i.name));
      return [...prev, ...newItems];
    });
    toast({ title: 'Покупка успешна! 🎉', description: `Куплено товаров: ${cartCount}. Списано ${cartTotal} 💠.` });
    setCart([]);
    setCartOpen(false);
  };

  const createProfile = () => {
    const nick = editNick.trim();
    if (nick.length < 3) { setNickError('Минимум 3 символа'); return; }
    if (nick.length > 20) { setNickError('Максимум 20 символов'); return; }
    setNickError('');
    setProfilePersist({ nick, avatarId: editAvatar });
    setBalancePersist((b) => b + 100);
    toast({ title: 'Профиль создан! 🎉', description: 'Тебе начислено +100 💠 за регистрацию!' });
  };

  const saveProfile = () => {
    const nick = editNick.trim();
    if (nick.length < 3) { setNickError('Минимум 3 символа'); return; }
    if (nick.length > 20) { setNickError('Максимум 20 символов'); return; }
    setNickError('');
    setProfilePersist({ nick, avatarId: editAvatar });
    toast({ title: 'Профиль обновлён!' });
  };

  const startEdit = () => {
    if (profile) { setEditNick(profile.nick); setEditAvatar(profile.avatarId); }
    else { setEditNick(''); setEditAvatar('default'); }
  };

  const navigateTo = (id: string) => {
    setActive(id);
    if (id === 'profile') startEdit();
  };

  return (
    <div className="min-h-screen grid-bg text-foreground font-body overflow-x-hidden">
      <Toaster />

      {/* Ambient glows */}
      <div className="pointer-events-none fixed -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="pointer-events-none fixed top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-fuchsia-500/20 blur-[120px]" />

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-white/5">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-fuchsia-500 flex items-center justify-center font-display font-bold text-background text-lg">B</div>
            <span className="font-display text-xl font-bold tracking-wide">
              BRAWL <span className="text-gradient">SHOP</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => navigateTo(n.id)}
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
                <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 rounded-full bg-fuchsia-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => navigateTo('profile')}>
              <AvatarDisplay avatarId={profile?.avatarId ?? 'default'} size="sm" />
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <nav className="flex md:hidden border-t border-white/5">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => navigateTo(n.id)}
              className={`flex-1 py-2 flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
                active === n.id ? 'text-cyan-300' : 'text-muted-foreground'
              }`}
            >
              <Icon name={n.icon} size={18} />
              {n.label}
            </button>
          ))}
        </nav>
      </header>

      {/* ── MAIN CONTENT ── */}
      {active !== 'profile' ? (
        <>
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
                  <Button onClick={() => navigateTo('shop')} size="lg" className="bg-gradient-to-r from-cyan-400 to-cyan-500 text-background font-display font-semibold hover:opacity-90">
                    <Icon name="ShoppingBag" size={18} /> В магазин
                  </Button>
                  <Button onClick={() => navigateTo('profile')} size="lg" variant="outline" className="border-fuchsia-400/40 text-fuchsia-200 hover:bg-fuchsia-500/10 font-display font-semibold">
                    <Icon name="UserPlus" size={18} /> {profile ? 'Мой профиль' : 'Создать профиль'}
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
                <Button size="lg" className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-display font-semibold shrink-0">
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
                    className={`group relative rounded-2xl border bg-card/60 backdrop-blur p-5 transition-all duration-300 hover:-translate-y-1 ${r.color} animate-fade-in`}
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
                        {item.emoji
                          ? <span className="text-4xl leading-none">{item.emoji}</span>
                          : <Icon name={item.icon} size={36} className="opacity-90" />
                        }
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
        </>
      ) : (
        /* ── PROFILE PAGE ── */
        <section className="container py-10 pb-20 animate-fade-in">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <h2 className="font-display text-3xl md:text-4xl font-bold">МОЙ ПРОФИЛЬ</h2>
            <div className="flex gap-2 p-1 rounded-xl bg-secondary border border-white/5">
              {(['edit', 'collection'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setProfileTab(t)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                    profileTab === t ? 'bg-cyan-400 text-background' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={t === 'edit' ? 'UserCog' : 'Package'} size={15} />
                  {t === 'edit' ? 'Настройки' : `Коллекция ${owned.length > 0 ? `(${owned.length})` : ''}`}
                </button>
              ))}
            </div>
          </div>

          {profileTab === 'collection' ? (
            <div>
              {owned.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-4">
                  <Icon name="PackageOpen" size={56} className="opacity-30" />
                  <p className="text-lg font-display">Коллекция пуста</p>
                  <p className="text-sm">Купи косметику или титулы в магазине — они появятся здесь</p>
                  <Button onClick={() => setActive('shop')} className="mt-2 bg-cyan-400 text-background font-display font-semibold hover:opacity-90">
                    <Icon name="ShoppingBag" size={16} /> Перейти в магазин
                  </Button>
                </div>
              ) : (
                <>
                  {(['Титул', 'Косметика'] as const).map((type) => {
                    const group = owned.filter((i) => i.type === type);
                    if (!group.length) return null;
                    return (
                      <div key={type} className="mb-10">
                        <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                          <Icon name={type === 'Титул' ? 'Crown' : 'Sparkles'} size={18} className="text-cyan-300" />
                          {type === 'Титул' ? 'Титулы' : 'Косметика'}
                          <span className="text-muted-foreground text-sm font-normal">({group.length})</span>
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                          {group.map((item) => {
                            const r = RARITY[item.rarity];
                            return (
                              <div key={item.name} className={`rounded-2xl border bg-card/60 backdrop-blur p-4 flex flex-col items-center text-center gap-3 ${r.color}`}>
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-background flex items-center justify-center border ${r.color}`}>
                                  {item.emoji
                                    ? <span className="text-3xl leading-none">{item.emoji}</span>
                                    : <Icon name={item.icon} size={28} />
                                  }
                                </div>
                                <div>
                                  <p className="font-display font-semibold text-sm leading-tight">{item.name}</p>
                                  <p className={`text-[10px] font-bold uppercase tracking-wider mt-1 ${r.color}`}>{item.rarity}</p>
                                </div>
                                <div className="mt-auto w-full px-2 py-1 rounded-lg bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-[10px] font-semibold flex items-center justify-center gap-1">
                                  <Icon name="Check" size={11} /> В коллекции
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          ) : (

          <div className="grid md:grid-cols-3 gap-8">
            {/* Left — form */}
            <div className="md:col-span-2 space-y-6">
              {/* Avatar picker */}
              <div className="rounded-2xl border border-white/5 bg-card/60 backdrop-blur p-6">
                <p className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-4">Выбери аватарку</p>
                <div className="flex flex-wrap gap-4">
                  {AVATARS.map((av) => (
                    <button
                      key={av.id}
                      onClick={() => setEditAvatar(av.id)}
                      className={`relative rounded-2xl overflow-hidden transition-all ${
                        editAvatar === av.id ? 'ring-2 ring-cyan-400 scale-105' : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      {av.src ? (
                        <img src={av.src} alt={av.label} className="w-20 h-20 object-cover" />
                      ) : (
                        <div className="w-20 h-20 bg-gradient-to-br from-secondary to-background flex items-center justify-center">
                          <Icon name="User" size={32} className="text-muted-foreground" />
                        </div>
                      )}
                      {editAvatar === av.id && (
                        <div className="absolute inset-0 bg-cyan-400/10 flex items-end justify-center pb-1">
                          <Icon name="Check" size={16} className="text-cyan-300" />
                        </div>
                      )}
                      <p className="text-[10px] text-center text-muted-foreground mt-1 px-1 truncate w-20">{av.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Nick input */}
              <div className="rounded-2xl border border-white/5 bg-card/60 backdrop-blur p-6">
                <label className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3 block">
                  Никнейм
                </label>
                <input
                  type="text"
                  value={editNick}
                  onChange={(e) => { setEditNick(e.target.value); setNickError(''); }}
                  placeholder="Введи свой ник..."
                  maxLength={20}
                  className="w-full bg-secondary border border-white/10 rounded-xl px-4 py-3 font-display text-lg placeholder:text-muted-foreground focus:outline-none focus:border-cyan-400/60 transition-colors"
                />
                {nickError && <p className="text-red-400 text-sm mt-2 flex items-center gap-1"><Icon name="AlertCircle" size={14} />{nickError}</p>}
                <p className="text-muted-foreground text-xs mt-2">{editNick.length}/20 символов · минимум 3</p>
              </div>

              <Button
                size="lg"
                onClick={profile ? saveProfile : createProfile}
                className="w-full bg-gradient-to-r from-cyan-400 to-cyan-500 text-background font-display font-semibold hover:opacity-90 text-lg h-14"
              >
                {profile ? (
                  <><Icon name="Save" size={20} /> Сохранить изменения</>
                ) : (
                  <><Icon name="UserPlus" size={20} /> Создать профиль +100 💠</>
                )}
              </Button>
            </div>

            {/* Right — preview + balance */}
            <div className="space-y-4">
              {/* Profile card preview */}
              <div className="rounded-2xl border border-white/5 bg-card/60 backdrop-blur p-6 flex flex-col items-center text-center">
                <p className="font-display text-xs text-muted-foreground uppercase tracking-wider mb-4">Предпросмотр</p>
                <div className="relative mb-4">
                  <AvatarDisplay avatarId={editAvatar} size="lg" />
                  {editAvatar !== 'default' && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-cyan-400 flex items-center justify-center">
                      <Icon name="Check" size={12} className="text-background" />
                    </div>
                  )}
                </div>
                <p className="font-display font-bold text-xl mb-1">
                  {editNick.trim() || <span className="text-muted-foreground italic">Твой ник</span>}
                </p>
                <p className="text-muted-foreground text-sm">Игрок Brawl Shon</p>
              </div>

              {/* Balance card */}
              <div className="rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-card/60 backdrop-blur p-6">
                <p className="font-display text-xs text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Icon name="Wallet" size={14} /> Баланс клеверов
                </p>
                <p className="font-display text-4xl font-bold text-cyan-300 mb-1">
                  {balance.toLocaleString('ru-RU')}
                </p>
                <p className="text-muted-foreground text-sm flex items-center gap-1"><Clover /> клеверов на счету</p>
                {!profile && (
                  <div className="mt-4 p-3 rounded-xl bg-fuchsia-500/10 border border-fuchsia-400/20 text-fuchsia-300 text-xs flex items-center gap-2">
                    <Icon name="Gift" size={14} />
                    Создай профиль и получи +100 💠 бесплатно!
                  </div>
                )}
                {profile && (
                  <div className="mt-4 p-3 rounded-xl bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs flex items-center gap-2">
                    <Icon name="CheckCircle" size={14} />
                    Приветственные 100 💠 получены!
                  </div>
                )}
              </div>

              {/* Stats */}
              {profile && (
                <div className="rounded-2xl border border-white/5 bg-card/60 backdrop-blur p-6 space-y-3">
                  <p className="font-display text-xs text-muted-foreground uppercase tracking-wider">Статистика</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Куплено товаров</span>
                    <span className="font-semibold">{ITEMS.length - visible.length + 0}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Статус</span>
                    <span className="text-amber-300 font-semibold flex items-center gap-1"><Icon name="Star" size={12} />Новичок</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          )}
        </section>
      )}

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
                <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground gap-3 py-20">
                  <Icon name="PackageOpen" size={48} className="opacity-40" />
                  <p>Корзина пуста. Добавь косметику или титулы!</p>
                </div>
              )}
              {cart.map((line) => {
                const r = RARITY[line.item.rarity];
                return (
                  <div key={line.item.name} className="flex items-center gap-3 rounded-xl border border-white/5 bg-secondary/40 p-3">
                    <div className={`w-12 h-12 shrink-0 rounded-lg bg-gradient-to-br from-secondary to-background flex items-center justify-center border ${r.color}`}>
                      {line.item.emoji
                        ? <span className="text-2xl leading-none">{line.item.emoji}</span>
                        : <Icon name={line.item.icon} size={22} />
                      }
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
                className="w-full bg-gradient-to-r from-cyan-400 to-cyan-500 text-background font-display font-semibold hover:opacity-90 disabled:opacity-40"
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
            <span className="font-display font-semibold text-foreground">BRAWL SHOP</span>
          </div>
          <p>© 2026 Brawl Shop · Валюта проекта — клеверы 💠</p>
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