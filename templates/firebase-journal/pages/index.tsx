import { useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc 
} from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  createdAt: any;
  mood: string;
}

export default function Home() {
  const [user, loading] = useAuthState(auth);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [newEntry, setNewEntry] = useState({ title: '', content: '', mood: 'neutral' });
  const [editingEntry, setEditingEntry] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, 'users', user.uid, 'entries'),
        orderBy('createdAt', 'desc')
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const entriesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as JournalEntry[];
        setEntries(entriesData);
      });

      return () => unsubscribe();
    }
  }, [user]);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const addEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newEntry.title.trim() || !newEntry.content.trim()) return;

    try {
      await addDoc(collection(db, 'users', user.uid, 'entries'), {
        title: newEntry.title,
        content: newEntry.content,
        mood: newEntry.mood,
        createdAt: new Date(),
      });

      setNewEntry({ title: '', content: '', mood: 'neutral' });
    } catch (error) {
      console.error('Error adding entry:', error);
    }
  };

  const deleteEntry = async (entryId: string) => {
    if (!user) return;

    try {
      await deleteDoc(doc(db, 'users', user.uid, 'entries', entryId));
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  const updateEntry = async (entryId: string, updates: Partial<JournalEntry>) => {
    if (!user) return;

    try {
      await updateDoc(doc(db, 'users', user.uid, 'entries', entryId), updates);
      setEditingEntry(null);
    } catch (error) {
      console.error('Error updating entry:', error);
    }
  };

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case 'happy': return '😊';
      case 'sad': return '😢';
      case 'excited': return '🎉';
      case 'calm': return '😌';
      case 'anxious': return '😰';
      default: return '😐';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">{{APP_NAME}}</h1>
          <p className="text-xl text-gray-600 mb-8">{{DESCRIPTION}}</p>
          <button
            onClick={signInWithGoogle}
            className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 font-semibold"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-gray-900">{{APP_NAME}}</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user.displayName}</span>
              <button
                onClick={handleSignOut}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* New Entry Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">New Journal Entry</h2>
          <form onSubmit={addEntry} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Entry title..."
                value={newEntry.title}
                onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <textarea
                placeholder="How are you feeling today?"
                value={newEntry.content}
                onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Mood:</label>
              <select
                value={newEntry.mood}
                onChange={(e) => setNewEntry({ ...newEntry, mood: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="happy">😊 Happy</option>
                <option value="sad">😢 Sad</option>
                <option value="excited">🎉 Excited</option>
                <option value="calm">😌 Calm</option>
                <option value="anxious">😰 Anxious</option>
                <option value="neutral">😐 Neutral</option>
              </select>
              <button
                type="submit"
                className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700"
              >
                Add Entry
              </button>
            </div>
          </form>
        </div>

        {/* Journal Entries */}
        <div className="space-y-6">
          {entries.map((entry) => (
            <div key={entry.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{getMoodEmoji(entry.mood)}</span>
                  <h3 className="text-lg font-semibold text-gray-900">{entry.title}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {entry.createdAt?.toDate?.()?.toLocaleDateString() || 'Unknown date'}
                  </span>
                  <button
                    onClick={() => setEditingEntry(entry.id)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteEntry(entry.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              {editingEntry === entry.id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    defaultValue={entry.title}
                    onBlur={(e) => updateEntry(entry.id, { title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <textarea
                    defaultValue={entry.content}
                    onBlur={(e) => updateEntry(entry.id, { content: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              ) : (
                <p className="text-gray-700 whitespace-pre-wrap">{entry.content}</p>
              )}
            </div>
          ))}
        </div>

        {entries.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No journal entries yet. Start writing!</p>
          </div>
        )}
      </main>
    </div>
  );
}

