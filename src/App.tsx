import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, Calendar, Trees, X, ChevronRight, Compass, ShieldAlert } from 'lucide-react';
import { useState, useEffect } from 'react';
import { PARKS, Park } from './data/parks';

export default function App() {
  const [selectedPark, setSelectedPark] = useState<Park | null>(null);

  const [activeTab, setActiveTab] = useState('Discover Parks');
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (parkId: string) => {
    setFavorites(prev => prev.includes(parkId) ? prev.filter(id => id !== parkId) : [...prev, parkId]);
  };

  return (
    <div className="min-h-screen bg-brand-cream text-brand-bark p-6 flex gap-6">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col justify-between py-10 px-6 border-r border-brand-bark/10">
        <div>
          <h1 className="font-serif text-2xl text-brand-sage mb-12">Wilderness.</h1>
          <nav className="space-y-2">
            {['Discover Parks', 'My Passport', 'Trail Maps', 'Ranger Tips', 'Preservation', 'My Favorites'].map((item) => (
              <div 
                key={item}
                onClick={() => setActiveTab(item)}
                className={`py-3 px-4 rounded-xl cursor-pointer text-sm font-medium transition-colors ${activeTab === item ? 'bg-brand-sage text-white' : 'hover:bg-brand-sage/5'}`}
              >
                {item}
              </div>
            ))}
          </nav>
        </div>


        <div className="text-center">
            {/* Soundscape Player */}
            <div className="bg-brand-sage/10 p-4 rounded-2xl mb-6 mx-4">
              <h4 className="text-xs uppercase tracking-wider mb-2 opacity-70">Nature Soundscape</h4>
              <p className="text-[10px] opacity-50 mb-3">(Ensure .mp3 files are in /public/sounds/)</p>
              <select 
                onChange={(e) => {
                  const audio = document.getElementById('nature-audio') as HTMLAudioElement;
                  if (audio && e.target.value) {
                    audio.src = e.target.value;
                    audio.play().catch(err => console.error("Audio playback failed:", err));
                  }
                }}
                className="w-full bg-white rounded-lg p-2 text-xs border border-brand-bark/10"
              >
                <option value="">Select Sound</option>
                <option value="/sounds/stream.mp3">Mountain Stream</option>
                <option value="/sounds/volcano.mp3">Volcanic Rumble</option>
                <option value="/sounds/forest.mp3">Forest Wind</option>
                <option value="/sounds/ocean.mp3">Pacific Ocean Waves</option>
                <option value="/sounds/rain.mp3">Rain on Leaves</option>
                <option value="/sounds/canyon-echo.mp3">Canyon Echo</option>
                <option value="/sounds/desert-night.mp3">Desert Night</option>
                <option value="/sounds/bird-song.mp3">Alpine Bird Song</option>
                <option value="/sounds/glacier-crack.mp3">Glacier Crack</option>
                <option value="/sounds/thunderstorm.mp3">Thunderstorm</option>
              </select>
              <audio 
                id="nature-audio" 
                loop 
                className="hidden" 
                onError={() => {
                  const player = document.getElementById('nature-audio') as HTMLAudioElement;
                  alert("无法找到音频文件，请确认您已将 .mp3 文件上传至 /public/sounds/ 目录下。");
                }}
              />
            </div>

            <div className="w-32 h-32 border border-brand-earth rounded-full flex flex-col items-center justify-center mx-auto mb-4">
              <span className="font-serif text-3xl font-semibold">63</span>
              <span className="text-[10px] uppercase opacity-60">Grand Parks</span>
            </div>
            <p className="text-xs opacity-70 leading-relaxed">Protected since 1916<br/>National Park Service</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-auto">
        <header className="flex justify-between items-center mb-8">
            <div>
              <h2 className="font-serif text-4xl m-0">Explore the Wild</h2>
              <p className="mt-1 opacity-60 text-sm">Plan your next breath-taking journey through America's heritage.</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-200 border border-gray-300"></div>
        </header>

        {/* Dynamic Content */}
        {activeTab === 'Discover Parks' ? (
          <>
            <section className="bg-brand-bark rounded-[32px] p-10 text-white relative h-[380px] flex flex-col justify-end mb-8 shadow-xl overflow-hidden">
                <img src={PARKS[0].imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" />
                <div className="relative z-10">
                    <span className="text-brand-sage font-medium tracking-widest uppercase text-xs mb-3 block">Featured Wilderness</span>
                    <h3 className="font-serif text-5xl mb-3">{PARKS[0].name}</h3>
                    <p className="max-w-xl opacity-90 mb-8 text-lg leading-relaxed tracking-wide font-light">{PARKS[0].description}</p>
                    <div className="flex gap-10 items-end">
                        <div className="flex flex-col"><span className="text-[10px] uppercase opacity-60 tracking-widest">Established</span><span className="font-medium text-lg">{PARKS[0].established}</span></div>
                        <div className="flex flex-col"><span className="text-[10px] uppercase opacity-60 tracking-widest">Area Covered</span><span className="font-medium text-lg">{PARKS[0].acres.toLocaleString()} acres</span></div>
                        <a href={PARKS[0].mapUrl} target="_blank" rel="noopener noreferrer" className="bg-brand-sage text-white px-8 py-3 rounded-xl font-semibold text-sm ml-auto hover:bg-brand-sage/90 transition-colors">Plan Your Visit</a>
                    </div>
                </div>
            </section>

            {/* Grid */}
            <div className="grid grid-cols-2 gap-6">
              {[...PARKS.filter(p => ['yosemite', 'death-valley', 'yellowstone', 'grand-canyon', 'acadia', 'glacier', 'denali', 'kenai-fjords', 'everglades', 'joshua-tree'].includes(p.id))].map((park) => (
                <div key={park.id} className="bg-white p-5 rounded-[24px] flex items-center justify-between gap-4 border border-brand-bark/5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl bg-brand-sky overflow-hidden">
                      <img src={park.imageUrl} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg m-0">{park.name}</h4>
                      <p className="m-0 text-xs opacity-70 mt-1 uppercase tracking-wider">{park.state}</p>
                    </div>
                  </div>
                  <button onClick={() => toggleFavorite(park.id)} className={`p-2 rounded-full transition-colors ${favorites.includes(park.id) ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-400'}`}>
                    <Compass size={20} />
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : activeTab === 'Trail Maps' ? (
            <div className="grid grid-cols-2 gap-6">
              {PARKS.map((park) => (
                <a key={park.id} href={park.mapUrl} target="_blank" rel="noopener noreferrer" className="bg-white p-5 rounded-[24px] flex items-center gap-4 border border-brand-bark/5 shadow-sm hover:border-brand-sage transition-colors">
                  <div className="w-20 h-20 rounded-2xl bg-brand-sky flex items-center justify-center text-brand-bark/40">
                      <Compass size={32} />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg m-0 text-brand-bark">{park.name} Map</h4>
                    <p className="m-0 text-xs opacity-60 mt-1">View official NPS trail maps for {park.name}</p>
                  </div>
                </a>
              ))}
            </div>
        ) : activeTab === 'My Favorites' ? (
            <div className="grid grid-cols-1 gap-6">
              {PARKS.filter(p => favorites.includes(p.id)).length > 0 ? PARKS.filter(p => favorites.includes(p.id)).map((park) => (
                <div key={park.id} className="bg-white p-5 rounded-[24px] flex items-center justify-between gap-4 border border-brand-sage/20 shadow-md">
                     <div className="flex items-center gap-4">
                        <img src={park.imageUrl} className="w-20 h-20 rounded-2xl object-cover" />
                        <div>
                         <h4 className="font-serif text-lg m-0">{park.name}</h4>
                         <p className="text-sm opacity-70">{park.state}</p>
                       </div>
                     </div>
                     <button onClick={() => toggleFavorite(park.id)} className="p-2 rounded-full bg-red-50 text-red-500">
                        <Compass size={20} />
                     </button>
                </div>
              )) : (
                <div className="text-center p-10 border-2 border-dashed border-brand-bark/10 rounded-[32px]">
                   <Compass size={40} className="mx-auto mb-2 text-brand-sage"/>
                   <h3 className="text-xl font-serif">No favorites yet</h3>
                   <p className="opacity-60">Go to Discover Parks to add some!</p>
                </div>
              )}
            </div>
        ) : activeTab === 'My Passport' ? (
            <div className="space-y-6">
               <div className="bg-white p-8 rounded-[24px] border border-brand-bark/5 shadow-sm text-center">
                  <h3 className="font-serif text-3xl mb-4">Your Digital Passport</h3>
                  <p className="max-w-xl mx-auto opacity-70 mb-8">Track your journey across all 63 National Parks. Get your digital stamps and keep a record of your adventures.</p>
                  <a href="https://www.nps.gov/yose/planyourvisit/maps.htm" target="_blank" rel="noopener noreferrer" className="bg-brand-sage text-white px-8 py-4 rounded-xl font-semibold inline-block">Learn about Passport Program</a>
               </div>
               <div className="grid grid-cols-3 gap-6">
                 {[
                   { title: 'Cancellations', desc: 'Find stamp locations', url: 'https://www.nps.gov/olym/planyourvisit/national-parks-passport-program.htm' },
                   { title: 'My Log', desc: 'View your visited parks', url: 'https://www.nps.gov/index.htm' },
                   { title: 'Shop', desc: 'Buy physical passport', url: 'https://shop.americasnationalparks.org/' }
                 ].map((item) => (
                    <a key={item.title} href={item.url} target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-[24px] border border-brand-bark/5 shadow-sm hover:border-brand-earth transition-colors">
                        <h4 className="font-serif text-xl mb-2">{item.title}</h4>
                        <p className="text-sm opacity-60">{item.desc}</p>
                    </a>
                 ))}
               </div>
            </div>
        ) : activeTab === 'Ranger Tips' ? (
            <div className="space-y-6">
               <div className="bg-brand-bark p-8 rounded-[24px] text-white text-center">
                  <h3 className="font-serif text-3xl mb-4">Ranger Tips & Safety</h3>
                  <p className="max-w-xl mx-auto opacity-80 mb-8">Adventure safely. Learn essential tips from Park Rangers for protecting yourself and the wild during your visit.</p>
                  <a href="https://www.nps.gov/aboutus/news/plan-like-a-park-ranger.htm" target="_blank" rel="noopener noreferrer" className="bg-brand-sage text-white px-8 py-4 rounded-xl font-semibold inline-block">NPS Safety Basics</a>
               </div>
               <div className="grid grid-cols-2 gap-6">
                 {[
                   { title: 'Leave No Trace', desc: 'Protect the park legacy', url: 'https://www.nps.gov/articles/leave-no-trace-seven-principles.htm' },
                   { title: 'Wildlife Safety', desc: 'Stay safe around wild animals', url: 'https://www.nps.gov/subjects/watchingwildlife/smart.htm' },
                   { title: 'Ranger Programs', desc: 'Join guided experiences', url: 'https://www.nps.gov/mima/planyourvisit/ranger-programs-and-tours.htm' },
                   { title: 'Backcountry Safety', desc: 'Essential wilderness tips', url: 'https://www.nps.gov/subjects/camping/backcountry-camping.htm' }
                 ].map((item) => (
                    <a key={item.title} href={item.url} target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-[24px] border border-brand-bark/5 shadow-sm hover:border-brand-sage transition-colors">
                        <h4 className="font-serif text-xl mb-2">{item.title}</h4>
                        <p className="text-sm opacity-60">{item.desc}</p>
                    </a>
                 ))}
               </div>
            </div>
        ) : activeTab === 'Preservation' ? (
            <div className="space-y-6">
               <div className="bg-brand-sage p-8 rounded-[24px] text-white text-center">
                  <h3 className="font-serif text-3xl mb-4">Park Preservation</h3>
                  <p className="max-w-xl mx-auto opacity-80 mb-8">Helping protect and maintain our national heritage for future generations. Learn how you can contribute to the stewardship of these special places.</p>
                  <a href="https://www.nps.gov/subjects/historicpreservation/index.htm" target="_blank" rel="noopener noreferrer" className="bg-white text-brand-sage px-8 py-4 rounded-xl font-semibold inline-block">NPS Preservation Portal</a>
               </div>
               <div className="grid grid-cols-2 gap-6">
                 {[
                   { title: 'Cultural Resources', desc: 'Protecting human history', url: 'https://www.nps.gov/subjects/culturallandscapes/index.htm' },
                   { title: 'Natural Resources', desc: 'Saving ecosystems', url: 'https://www.nps.gov/orgs/1027/nr.htm' },
                   { title: 'Climate Change', desc: 'Adapting to a changing world', url: 'https://www.nps.gov/subjects/climatechange/index.htm' },
                   { title: 'Get Involved', desc: 'Volunteer and support', url: 'https://www.nps.gov/getinvolved/index.htm' }
                 ].map((item) => (
                    <a key={item.title} href={item.url} target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-[24px] border border-brand-bark/5 shadow-sm hover:border-brand-sage transition-colors">
                        <h4 className="font-serif text-xl mb-2">{item.title}</h4>
                        <p className="text-sm opacity-60">{item.desc}</p>
                    </a>
                 ))}
               </div>
            </div>
        ) : (
          <div className="flex items-center justify-center h-[500px] text-center border-2 border-dashed border-brand-bark/10 rounded-[32px]">
             <div className="opacity-60">
                <Compass size={48} className="mx-auto mb-4 text-brand-sage"/>
                <h3 className="font-serif text-2xl">{activeTab}</h3>
                <p>This feature is coming soon.</p>
             </div>
          </div>
        )}
      </main>
    </div>
  );
}
