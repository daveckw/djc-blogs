import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'src/lib/firebase';
import type { IRecentAction } from 'functions/types/userTypes';
import type { OutputItem } from 'src/layouts/components/searchbar/utils';

const MAX_RECENT_ACTIONS = 3;

export function shouldTrackPath(path: string): boolean {
    if (!path) return false;
    if (path === '/') return false;

    if (
        path.startsWith('/auth') ||
        path.startsWith('/sign-in') ||
        path.startsWith('/sign-up') ||
        path.startsWith('/forgot-password')
    ) {
        return false;
    }

    return path.startsWith('/dashboard');
}

export function findNavItemByPath(path: string, navItems: OutputItem[]): OutputItem | null {
    const normalizedPath = path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;
    let match = navItems.find((item) => item.path === normalizedPath || item.path === path);

    if (!match) {
        const matches = navItems.filter(
            (item) =>
                normalizedPath.startsWith(item.path) &&
                item.path !== '/dashboard' &&
                item.path.length > 1
        );

        if (matches.length > 0) {
            match = matches.sort((a, b) => b.path.length - a.path.length)[0];
        }
    }

    return match || null;
}

export async function saveRecentAction(
    userId: string,
    action: Omit<IRecentAction, 'count'>,
    currentRecentActions: IRecentAction[] = []
): Promise<void> {
    try {
        const existingAction = currentRecentActions.find((a) => a.path === action.path);

        let updatedActions: IRecentAction[];

        if (existingAction) {
            updatedActions = currentRecentActions.map((a) =>
                a.path === action.path ? { ...a, count: a.count + 1 } : a
            );
        } else {
            updatedActions = [...currentRecentActions, { ...action, count: 1 }];
        }

        const sortedActions = updatedActions
            .sort((a, b) => b.count - a.count)
            .slice(0, MAX_RECENT_ACTIONS);

        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, {
            recentActions: sortedActions,
        });

        console.log(
            '✅ Recent action saved:',
            action.title,
            '→',
            action.path,
            `(count: ${existingAction ? existingAction.count + 1 : 1})`
        );
    } catch (error) {
        console.error('❌ Error saving recent action:', error);
    }
}
