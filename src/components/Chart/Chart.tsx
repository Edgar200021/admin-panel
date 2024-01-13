import {
  Area,
  AreaChart,
  Brush,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { cn } from '../../utils/cn'
import { formatDate } from '../../utils/date'
import { useMemo } from 'react'

interface Props<T> {
  className?: string
  data: T
  YAxisKey: string
  XAxisKey: string
}

export function Chart<K extends object, T extends Array<K>>({
  className,
  data,
  YAxisKey,
  XAxisKey,
}: Props<T>) {
  const transformedData = useMemo(
    () =>
      data.map(value => {
        if ('created_at' in value && typeof value.created_at === 'string') {
          return {
            ...value,
            created_at: formatDate(new Date(value.created_at)),
          }
        }
        return value
      }),
    [data]
  )

  return (
    <div className={cn('h-[350px]', className)}>
      <ResponsiveContainer height={350} width={'100%'}>
        <AreaChart data={transformedData}>
          <defs>
            <linearGradient
              id="chartsGradient"
              x1="185.5"
              y1="0"
              x2="185.5"
              y2="217"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#1C64F2" />
              <stop offset="1" stopColor="#1C64F2" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          <XAxis
            tickMargin={12}
            tick={{ fill: '#616D8D', fontSize: 14, fontWeight: 500 }}
            tickLine={false}
            axisLine={false}
            dataKey={XAxisKey}
            interval={'preserveStart'}
            height={45}
          />
          <YAxis
            orientation="right"
            tickMargin={14}
            width={60}
            tick={{
              fill: '#616D8D',
              fontSize: 14,
              fontWeight: 500,
            }}
            axisLine={false}
            tickLine={false}
            dataKey={YAxisKey}
          />
          <CartesianGrid vertical={false} stroke="#222B44" />
          <Tooltip />
          <Area
            isAnimationActive={true}
            dataKey={YAxisKey}
            animationDuration={2000}
            animationEasing="ease"
            type={'bump'}
            strokeWidth={2}
            stroke="#1C64F2"
            fill="url(#chartsGradient)"
            name="Amount"
          />

          <Brush
            dataKey={XAxisKey}
            height={24}
            data={data}
            travellerWidth={3}
            startIndex={0}
            endIndex={data.length - 1}
            fill="#222B44"
          >
            <AreaChart data={data}>
              <Area
                autoReverse={true}
                dataKey={YAxisKey}
                type={'monotone'}
                stroke="#616D8D"
                fill="transparent"
                name="Extra sales"
                unit={'$'}
                strokeWidth={2}
              />
            </AreaChart>
          </Brush>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
