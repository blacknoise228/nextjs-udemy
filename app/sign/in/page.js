"use client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/api/supabase";
import { useEffect, useState } from "react";
import Modal from "@/components/modal/modal";
import styles from "./auth.module.css";

export default function SignIn() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        if (session) {
          console.log("session", session);
        }
      }
    );

    return () => authListener.subscription.unsubscribe();
  }, []);

  if (session) {
    return (
      <Modal>
        <div>
          <p>Вы вошли как {session.user.email}</p>
          <button onClick={() => supabase.auth.signOut()}>Выйти</button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal>
      <div className={styles.auth}>
        <Auth
          supabaseClient={supabase}
          providers={["google"]}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
        />
      </div>
    </Modal>
  );
}
