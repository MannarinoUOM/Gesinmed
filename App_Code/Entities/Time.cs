using System;
using System.Collections.Generic;
using System.Text;

namespace HospitalBLL.Entities
{
    public class Time
    {
        private int hour;
        private int minutes;


        public Time()
        {
        }


        public Time(int hour, int minutes)
        {

            Hour = hour;
            Minutes = minutes;
        }

        public int Minutes
        {
            get { return minutes; }
            set { minutes = value; }
        }

        public int Hour
        {
            get { return hour; }
            set { hour = value; }
        }

        public static bool operator <(Time a, Time b)
        {
            return (a.Hour < b.Hour) || (a.Hour == b.Hour && a.Minutes < b.Minutes);
        }

        public override bool Equals(object obj)
        {
            if (obj == null)
            {
                return false;
            }

            // If parameter cannot be cast to Point return false.
            Time p = obj as Time;
            if ((System.Object)p == null)
            {
                return false;
            }

            // Return true if the fields match:
            return (hour == p.Hour) && (Minutes == p.Minutes);

        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }

        public static bool operator >(Time a, Time b)
        {
            return !(a < b);
        }

        public static bool operator ==(Time a, Time b)
        {
            if ((object)a == null && (object)b == null)
                return true;

            return ((object)a != null && (object)b != null) && (a.Hour == b.Hour && a.Minutes == b.Minutes);
        }

        public static bool operator !=(Time a, Time b)
        {
            return (!(a == b));
        }

        public static bool operator <=(Time a, Time b)
        {
            return !(a > b);
        }

        public static bool operator >=(Time a, Time b)
        {
            return !(a < b);
        }



        public static implicit operator Time(DateTime d)
        {
            return new Time(d.Hour, d.Minute);
        }

        public DateTime ToDateTime()
        {
            return new DateTime(2000, 1, 1, this.Hour, this.Minutes, 0);
        }

        public override string ToString()
        {
            return string.Format("{0}:{1}", hour, minutes);
        }
    }
}
