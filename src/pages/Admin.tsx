import React, { useState } from 'react';
import { useProperties } from '../hooks/useProperties';
import { useTeamMembers } from '../hooks/useTeamMembers';
import { db, auth, storage } from '../lib/firebase';
import { doc, deleteDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import imageCompression from 'browser-image-compression';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Trash2, Edit2, Plus, LogOut, Users, Home as HomeIcon } from 'lucide-react';

export default function Admin() {
  const { properties, loading: propsLoading } = useProperties();
  const { members, loading: teamLoading } = useTeamMembers();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<'properties' | 'team'>('properties');
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentProperty, setCurrentProperty] = useState<any>({
    id: '', title: '', location: '', price: '', type: 'House', image: '', beds: '', baths: '', area: '', tag: '', tagColor: ''
  });
  
  const [isEditingTeam, setIsEditingTeam] = useState(false);
  const [currentTeam, setCurrentTeam] = useState<any>({
    id: '', name: '', role: '', description: '', image: ''
  });
  
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'property' | 'team') => {
    let file = e.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    try {
      const options = {
        maxSizeMB: 0.15,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };
      
      const compressedFile = await imageCompression(file, options);
      
      const storageRef = ref(storage, `images/${Date.now()}_${compressedFile.name}`);
      await uploadBytes(storageRef, compressedFile);
      const url = await getDownloadURL(storageRef);
      
      if (type === 'property') {
        setCurrentProperty({ ...currentProperty, image: url });
      } else {
        setCurrentTeam({ ...currentTeam, image: url });
      }
    } catch (error) {
      console.error("Error uploading image: ", error);
      alert("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const handleDeleteProperty = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      await deleteDoc(doc(db, "properties", id));
      window.location.reload();
    }
  };

  const handleSaveProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = currentProperty.id || Date.now().toString();
    await setDoc(doc(db, "properties", id), { ...currentProperty, id });
    setIsEditing(false);
    window.location.reload();
  };

  const handleDeleteTeam = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      await deleteDoc(doc(db, "team_members", id));
    }
  };

  const handleSaveTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = currentTeam.id || Date.now().toString();
    await setDoc(doc(db, "team_members", id), { ...currentTeam, id });
    setIsEditingTeam(false);
  };

  return (
    <div className="min-h-screen bg-[#02040a] text-white p-8 pt-32">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
          <h1 className="text-3xl font-display font-900">Admin Dashboard</h1>
          <button onClick={handleLogout} className="flex items-center gap-2 text-white/50 hover:text-red-400 transition-colors">
            <LogOut size={18} /> Logout
          </button>
        </div>

        {/* Tabs */}
        {!isEditing && !isEditingTeam && (
          <div className="flex gap-4 mb-8">
            <button 
              onClick={() => setActiveTab('properties')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-colors ${activeTab === 'properties' ? 'bg-gold-500 text-black' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}
            >
              <HomeIcon size={18} /> Properties
            </button>
            <button 
              onClick={() => setActiveTab('team')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-colors ${activeTab === 'team' ? 'bg-gold-500 text-black' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}
            >
              <Users size={18} /> Team Members
            </button>
          </div>
        )}

        {/* ======================= PROPERTIES SECTION ======================= */}
        {activeTab === 'properties' && !isEditingTeam && (
          isEditing ? (
            <div className="liquid-glass p-8 rounded-2xl border border-white/10">
              <h2 className="text-xl font-bold mb-6">{currentProperty.id ? 'Edit Property' : 'Add New Property'}</h2>
              <form onSubmit={handleSaveProperty} className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">Title</label>
                  <input required type="text" value={currentProperty.title} onChange={e => setCurrentProperty({...currentProperty, title: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">Location</label>
                  <input required type="text" value={currentProperty.location} onChange={e => setCurrentProperty({...currentProperty, location: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">Price (e.g. Rs 12.5 Crore)</label>
                  <input required type="text" value={currentProperty.price} onChange={e => setCurrentProperty({...currentProperty, price: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">Type</label>
                  <select value={currentProperty.type} onChange={e => setCurrentProperty({...currentProperty, type: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white">
                    <option>House</option>
                    <option>Apartment</option>
                    <option>Plot</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">Image URL (or Upload)</label>
                  <div className="flex gap-2">
                    <input type="file" accept="image/*" onChange={e => handleImageUpload(e, 'property')} disabled={uploading} className="hidden" id="prop-image-upload" />
                    <label htmlFor="prop-image-upload" className="bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-lg cursor-pointer flex items-center justify-center whitespace-nowrap border border-white/10">
                      {uploading ? 'Uploading...' : 'Upload Image'}
                    </label>
                    <input required type="text" value={currentProperty.image} onChange={e => setCurrentProperty({...currentProperty, image: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white" placeholder="https://..." />
                  </div>
                </div>
                <div className="col-span-2 flex justify-end gap-4 mt-4">
                  <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2 rounded-lg border border-white/20 hover:bg-white/5">Cancel</button>
                  <button type="submit" className="px-6 py-2 rounded-lg bg-gold-500 text-black font-bold hover:bg-gold-400">Save Property</button>
                </div>
              </form>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Properties</h2>
                <button 
                  onClick={() => { setCurrentProperty({ id: '', title: '', location: '', price: '', type: 'House', image: '', beds: '', baths: '', area: '', tag: '', tagColor: '' }); setIsEditing(true); }}
                  className="flex items-center gap-2 bg-gold-500 text-black px-4 py-2 rounded-lg font-bold hover:bg-gold-400"
                >
                  <Plus size={18} /> Add Property
                </button>
              </div>
              
              <div className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                      <th className="p-4 text-white/50 font-normal">Image</th>
                      <th className="p-4 text-white/50 font-normal">Title</th>
                      <th className="p-4 text-white/50 font-normal">Price</th>
                      <th className="p-4 text-white/50 font-normal">Type</th>
                      <th className="p-4 text-white/50 font-normal">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {propsLoading ? (
                      <tr><td colSpan={5} className="p-8 text-center text-white/50">Loading properties...</td></tr>
                    ) : properties.map(p => (
                      <tr key={p.id} className="border-b border-white/5 hover:bg-white/5">
                        <td className="p-4">
                          <img src={p.image} alt="prop" className="w-16 h-12 object-cover rounded-md" />
                        </td>
                        <td className="p-4 font-medium">{p.title}</td>
                        <td className="p-4 text-gold-400">{p.price}</td>
                        <td className="p-4">{p.type}</td>
                        <td className="p-4 flex gap-3">
                          <button onClick={() => { setCurrentProperty(p); setIsEditing(true); }} className="text-blue-400 hover:text-blue-300 p-2"><Edit2 size={18}/></button>
                          <button onClick={() => handleDeleteProperty(p.id)} className="text-red-400 hover:text-red-300 p-2"><Trash2 size={18}/></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )
        )}

        {/* ======================= TEAM SECTION ======================= */}
        {activeTab === 'team' && !isEditing && (
          isEditingTeam ? (
            <div className="liquid-glass p-8 rounded-2xl border border-white/10">
              <h2 className="text-xl font-bold mb-6">{currentTeam.id ? 'Edit Team Member' : 'Add Team Member'}</h2>
              <form onSubmit={handleSaveTeam} className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">Name</label>
                  <input required type="text" value={currentTeam.name} onChange={e => setCurrentTeam({...currentTeam, name: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">Role (e.g. CEO)</label>
                  <input required type="text" value={currentTeam.role} onChange={e => setCurrentTeam({...currentTeam, role: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">SEO Description</label>
                  <textarea required rows={3} value={currentTeam.description} onChange={e => setCurrentTeam({...currentTeam, description: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white" placeholder="Professional summary..."></textarea>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">Image URL (or Upload)</label>
                  <div className="flex gap-2">
                    <input type="file" accept="image/*" onChange={e => handleImageUpload(e, 'team')} disabled={uploading} className="hidden" id="team-image-upload" />
                    <label htmlFor="team-image-upload" className="bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-lg cursor-pointer flex items-center justify-center whitespace-nowrap border border-white/10">
                      {uploading ? 'Uploading...' : 'Upload Image'}
                    </label>
                    <input required type="text" value={currentTeam.image} onChange={e => setCurrentTeam({...currentTeam, image: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white" placeholder="/assets/team/name.jpg or https://..." />
                  </div>
                </div>
                <div className="col-span-2 flex justify-end gap-4 mt-4">
                  <button type="button" onClick={() => setIsEditingTeam(false)} className="px-6 py-2 rounded-lg border border-white/20 hover:bg-white/5">Cancel</button>
                  <button type="submit" className="px-6 py-2 rounded-lg bg-gold-500 text-black font-bold hover:bg-gold-400">Save Member</button>
                </div>
              </form>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Team Members</h2>
                <button 
                  onClick={() => { setCurrentTeam({ id: '', name: '', role: '', description: '', image: '' }); setIsEditingTeam(true); }}
                  className="flex items-center gap-2 bg-gold-500 text-black px-4 py-2 rounded-lg font-bold hover:bg-gold-400"
                >
                  <Plus size={18} /> Add Member
                </button>
              </div>
              
              <div className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                      <th className="p-4 text-white/50 font-normal">Image</th>
                      <th className="p-4 text-white/50 font-normal">Name</th>
                      <th className="p-4 text-white/50 font-normal">Role</th>
                      <th className="p-4 text-white/50 font-normal">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamLoading ? (
                      <tr><td colSpan={4} className="p-8 text-center text-white/50">Loading team...</td></tr>
                    ) : members.map(m => (
                      <tr key={m.id} className="border-b border-white/5 hover:bg-white/5">
                        <td className="p-4">
                          <img src={m.image} alt={m.name} className="w-12 h-12 object-cover rounded-full" />
                        </td>
                        <td className="p-4 font-medium">{m.name}</td>
                        <td className="p-4 text-gold-400">{m.role}</td>
                        <td className="p-4 flex gap-3">
                          <button onClick={() => { setCurrentTeam(m); setIsEditingTeam(true); }} className="text-blue-400 hover:text-blue-300 p-2"><Edit2 size={18}/></button>
                          <button onClick={() => handleDeleteTeam(m.id)} className="text-red-400 hover:text-red-300 p-2"><Trash2 size={18}/></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )
        )}

      </div>
    </div>
  );
}
