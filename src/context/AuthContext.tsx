import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db, doc, onSnapshot, setDoc, handleFirestoreError, OperationType } from '../lib/firebase';
import { User, onAuthStateChanged } from 'firebase/auth';

interface UserData {
  email: string;
  isPremium: boolean;
  dailyDownloads?: {
    date: string;
    count: number;
  };
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // Listen for user data changes
        const userDocRef = doc(db, 'users', currentUser.uid);
        
        const unsubscribeData = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            setUserData(docSnap.data() as UserData);
          } else {
            // Initialize user data if it doesn't exist
            const initialData: UserData = {
              email: currentUser.email || '',
              isPremium: false,
              dailyDownloads: {
                date: new Date().toLocaleDateString(),
                count: 0
              }
            };
            setDoc(userDocRef, initialData).catch(err => handleFirestoreError(err, OperationType.WRITE, `users/${currentUser.uid}`));
          }
        }, (error) => {
          handleFirestoreError(error, OperationType.GET, `users/${currentUser.uid}`);
        });

        setLoading(false);
        return () => unsubscribeData();
      } else {
        setUserData(null);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userData, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
