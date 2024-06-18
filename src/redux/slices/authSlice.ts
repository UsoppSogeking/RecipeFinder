import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { auth } from "../../services/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { RootState } from '../store';
import { db } from "../../services/firebase";
import firebase from "firebase/compat/app";
import { FirebaseError } from 'firebase/app';
import "firebase/compat/auth";

interface CustomUser {
    uid: string;
    email: string | null;
    emailVerified: boolean;
    isAnonymous: boolean;
    createdAt: string | null;
    lastLoginAt: string | null;
}

interface AuthState {
    user: CustomUser | null;
    isLoading: boolean;
    error: string | null;
}

interface LoginUserData {
    email: string;
    password: string;
}

// Tipos de dados para thunk
interface SignupUserData {
    email: string;
    password: string;
    username: string;
    confirmPassword: string;
}

type SignupReturn = CustomUser;
type SignupError = string;

type LoginReturn = CustomUser;
type LoginError = string;

// Helper function to convert firebase.User to CustomUser
const convertFirebaseUserToCustomUser = (user: firebase.User): CustomUser => ({
    uid: user.uid,
    email: user.email,
    emailVerified: user.emailVerified,
    isAnonymous: user.isAnonymous,
    createdAt: user.metadata.creationTime ?? null,
    lastLoginAt: user.metadata.lastSignInTime ?? null
});

//Thunk assíncrono para registrar um novo usuário
export const signup = createAsyncThunk<SignupReturn, SignupUserData, { rejectValue: SignupError }>(
    'auth/signup',
    async (userData, { dispatch, rejectWithValue }) => {
        const { email, password, username, confirmPassword } = userData;
        // Verifica se as senhas coincidem
        if (password !== confirmPassword) {
            dispatch(setError("Passwords do not match."));
            return rejectWithValue("Passwords do not match.");
        }
        try {
            //Criar usuário no firestore authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            //salvar o nome de usuário no firestore
            await setDoc(doc(db, 'users', user.uid), {
                username,
                email: user.email
            });

            // Retornar dados customizados do usuário
            return convertFirebaseUserToCustomUser(user);

        } catch (error: unknown) {
            let errorMessage;
            if (error instanceof FirebaseError) {
                if (error.code === 'auth/email-already-in-use') {
                    errorMessage = "Email already in use. Please use a different email.";
                } else {
                    errorMessage = error.message || "An error occurred. Please try again.";
                }
            } else {
                errorMessage = "An unknown error occurred. Please try again.";
            }
            dispatch(setError(errorMessage));
            return rejectWithValue(errorMessage);
        }
    }
);

// Thunk assíncrono para fazer login
export const login = createAsyncThunk<LoginReturn, LoginUserData, { rejectValue: LoginError }>(
    'auth/login',
    async (userData, { dispatch, rejectWithValue }) => {
        const { email, password } = userData;
        try {
            // Realizar o login usando Firebase Authentication
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            return convertFirebaseUserToCustomUser(user);
        } catch (error: unknown) {
            let errorMessage;
            if (error instanceof FirebaseError) {
                if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                    errorMessage = "Invalid email or password. Please try again.";
                } else {
                    errorMessage = error.message || "An error occurred. Please try again.";
                }
            } else {
                errorMessage = "An unknown error occurred. Please try again.";
            }
            dispatch(setError(errorMessage));
            return rejectWithValue(errorMessage);
        }
    }
);

// Assíncrono thunk para monitorar mudanças no estado de autenticação
export const watchAuthState = createAsyncThunk<CustomUser | null>(
    'auth/watchAuthState',
    async () => {
        return new Promise((resolve) => {
            const unsubscribe = auth.onAuthStateChanged((user) => {
                const customUser = convertFirebaseUserToCustomUser(user);
                resolve(customUser);
            });
            return unsubscribe;
        });
    }
);

// Thunk assíncrono para fazer logout
export const logout = createAsyncThunk<void>(
    'auth/logout',
    async (_, { dispatch }) => {
        try {
            await signOut(auth);
            dispatch(setUser(null));
        } catch (error: unknown) {
            console.error("Error logging out:", error);
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isLoading: false,
        error: null,
    } as AuthState,
    reducers: {
        // Reducers sincronos para atualizar o estado
        setUser: (state, action: PayloadAction<CustomUser | null>) => {
            state.user = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
    extraReducers: (builder) => {
        // Tratamento das ações assíncronas geradas pelo createAsyncThunk
        builder.addCase(signup.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(signup.fulfilled, (state, action: PayloadAction<CustomUser>) => {
            state.user = action.payload;
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(signup.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string
        });
        builder.addCase(watchAuthState.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(logout.fulfilled, (state) => {
            state.user = null;
            state.isLoading = false;
            state.error = null;
        })
    },
});

export const { setUser, setLoading, setError } = authSlice.actions;

// Seletor para acessar o estado de autenticação
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectError = (state: RootState) => state.auth.error;

export default authSlice.reducer;
