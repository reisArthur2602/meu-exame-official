import { Check, TriangleAlert } from 'lucide-react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { forwardRef, useId } from 'react';

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type InputState = 'default' | 'success' | 'error';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    helperText?: string;
    errorMessage?: string;
    successMessage?: string;
    icon?: ReactNode;
    trailing?: ReactNode;
};

const stateStyles: Record<InputState, string> = {
    default:
        'border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 transition focus:border-sky-900 focus:ring-2 focus:ring-sky-900/20',
    success: 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600/15',
    error: 'border-rose-600 bg-rose-50/50 ring-2 ring-rose-600/15',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            id,
            label,
            helperText,
            errorMessage,
            successMessage,
            icon,
            trailing,
            className,
            ...props
        },
        ref
    ) => {
        const generatedId = useId();
        const inputId = id ?? generatedId;
        const feedbackId = `${inputId}-feedback`;
        const state: InputState = errorMessage ? 'error' : successMessage ? 'success' : 'default';

        return (
            <div className="block">
                {label ? <Label htmlFor={inputId}>{label}</Label> : null}

                <div className="relative">
                    {icon ? (
                        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                            {icon}
                        </span>
                    ) : null}

                    <input
                        id={inputId}
                        ref={ref}
                        aria-invalid={state === 'error' || undefined}
                        aria-describedby={errorMessage || successMessage ? feedbackId : undefined}
                        className={cn(
                            'w-full rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 border transition',
                            icon ? 'pl-12' : null,
                            trailing ? 'pr-12' : null,
                            stateStyles[state],
                            className
                        )}
                        {...props}
                    />

                    {trailing ? (
                        <span className="absolute inset-y-0 right-0 flex items-center">
                            {trailing}
                        </span>
                    ) : null}
                </div>

                {errorMessage ? (
                    <span
                        id={feedbackId}
                        className="mt-2 flex items-center gap-1.5 text-xs font-medium text-rose-600"
                    >
                        <TriangleAlert className="size-4" strokeWidth={1.8} aria-hidden="true" />
                        {errorMessage}
                    </span>
                ) : successMessage ? (
                    <span
                        id={feedbackId}
                        className="mt-2 flex items-center gap-1.5 text-xs font-medium text-emerald-700"
                    >
                        <Check className="size-4" strokeWidth={2} aria-hidden="true" />
                        {successMessage}
                    </span>
                ) : helperText ? (
                    <span className="mt-2 block text-xs text-slate-500">{helperText}</span>
                ) : null}
            </div>
        );
    }
);

Input.displayName = 'Input';
