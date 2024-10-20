/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@prisma/client';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        createMany: procedure.input($Schema.JobNoteInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).jobNote.createMany(input as any))),

        create: procedure.input($Schema.JobNoteInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).jobNote.create(input as any))),

        deleteMany: procedure.input($Schema.JobNoteInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).jobNote.deleteMany(input as any))),

        delete: procedure.input($Schema.JobNoteInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).jobNote.delete(input as any))),

        findFirst: procedure.input($Schema.JobNoteInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).jobNote.findFirst(input as any))),

        findMany: procedure.input($Schema.JobNoteInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).jobNote.findMany(input as any))),

        findUnique: procedure.input($Schema.JobNoteInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).jobNote.findUnique(input as any))),

        updateMany: procedure.input($Schema.JobNoteInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).jobNote.updateMany(input as any))),

        update: procedure.input($Schema.JobNoteInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).jobNote.update(input as any))),

        count: procedure.input($Schema.JobNoteInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).jobNote.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.JobNoteCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.JobNoteCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.JobNoteCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.JobNoteCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.JobNoteCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.JobNoteCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.JobNoteGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.JobNoteGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.JobNoteCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.JobNoteCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.JobNoteGetPayload<T>, Context>) => Promise<Prisma.JobNoteGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.JobNoteDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.JobNoteDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.JobNoteDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.JobNoteDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.JobNoteDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.JobNoteDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.JobNoteGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.JobNoteGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.JobNoteDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.JobNoteDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.JobNoteGetPayload<T>, Context>) => Promise<Prisma.JobNoteGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.JobNoteFindFirstArgs, TData = Prisma.JobNoteGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.JobNoteFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.JobNoteGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.JobNoteFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.JobNoteFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.JobNoteGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.JobNoteGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.JobNoteFindManyArgs, TData = Array<Prisma.JobNoteGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.JobNoteFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.JobNoteGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.JobNoteFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.JobNoteFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.JobNoteGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.JobNoteGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.JobNoteFindUniqueArgs, TData = Prisma.JobNoteGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.JobNoteFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.JobNoteGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.JobNoteFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.JobNoteFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.JobNoteGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.JobNoteGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.JobNoteUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.JobNoteUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.JobNoteUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.JobNoteUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.JobNoteUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.JobNoteUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.JobNoteGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.JobNoteGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.JobNoteUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.JobNoteUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.JobNoteGetPayload<T>, Context>) => Promise<Prisma.JobNoteGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.JobNoteCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.JobNoteCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.JobNoteCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.JobNoteCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.JobNoteCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.JobNoteCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.JobNoteCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.JobNoteCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
